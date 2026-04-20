import { useContext, useEffect, useRef, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "./dashboard";
import { useAuth, useUser } from "@clerk/clerk-react";
import { UserCreditsContext } from "../context/UserCreditContext";
import axios from "axios";
import apiEndpoint from "../util/apiEndpoint";
import { AlertCircle, Check, CreditCard, Currency, Loader, Loader2 } from "lucide-react";
import { features } from "../assets/data";

const Subscription = () => {
  const [processingPayment,setProcessingPayment] =useState(false);
  const [selectedPlan, setSelectedPlan] =useState(null);//
  const [message,setMessage]=useState("");
  const [messageType,setMessageType]=useState("");
const [razorpayLoaded,setRazorpayLoaded]=useState(false);
const {user} =useUser();

const { getToken, isLoaded, isSignedIn } = useAuth();
const razorpayScriptRef =useRef(null);

const {credits,setCredits,fetchUserCredits} =useContext(UserCreditsContext);

const plans =[
  {
    id:"premium",
    name:"Premium",
    credits:500,
    price:50,
    features:[
      "500 File Uploads",
       "Access basic features",
        "Priority support", 
    ],
    recommended:false
  },
  {
    id:"ultimate",
    name:"Ultimate",
    credits:5000,
    price:100,
    features:[
      "5000 File Uploads",
       "Access to all features ",
        "Priority support", 
        "Advance analytics"
    ],
    recommended:true
  }

];

useEffect(()=>{
  if(!window.Razorpay){
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () =>{
      console.log("script loded successfully")
       setRazorpayLoaded(true);
    };
    script.onerror =()=>{
      console.error("Razorpay script failed to load");
    setMessage("Razorpay script failed to load.")
    setMessageType("error");
    
    };
    document.body.appendChild(script);
    razorpayScriptRef.current = script;
  }else{
    setRazorpayLoaded(true);
  
  }
  return ()=>{
    if(razorpayScriptRef.current){
      document.body.removeChild(razorpayScriptRef.current);
    };
  }
  
},[])

useEffect(() => {
  const fetchUserCredits = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const token = await getToken();
      if (!token) return;
      const response = await axios.get(apiEndpoint.GET_CREDITS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCredits(response.data.credits);

    } catch (error) {
      console.error("Error fetching credits:", error);
      if (error.response?.status === 403) {
        setMessage("Access denied. Please check your account status.");
      } else {
        setMessage("Failed to fetch credits. Please try again.");
      }
      setMessageType("error");

    }
  }
  fetchUserCredits();

}, [getToken, isLoaded, isSignedIn]);

const handlePurchase =async (plan)=>{
  if(!razorpayLoaded){
    setMessage("Payment gateway is still loading. Please wait a bit.");
    setMessageType("error");
    return;
  }
  setProcessingPayment(true);
  setMessage("");
try {
  const token = await getToken();
  if (!token) {
    setMessage("Authentication token missing. Please sign in again.");
    setMessageType("error");
    setProcessingPayment(false);
    return;
  }
  const response = await axios.post(apiEndpoint.CREATE_ORDER, {
    planId: plan.id,
    amount: plan.price * 100,
    currency: "INR",
    credits: plan.credits
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const options={
    key :import.meta.env.VITE_RAZORPAY_KEY,
    amount:plan.price*100,
    currency:"INR",
    name:"FileShare",
    description:`Purchase ${plan.credits} credits`,
    order_id:response.data.orderId,

    handler :async function (response) {
      try {
        
        const verifyResponse = await axios.post(apiEndpoint.VERIFY_PAYMENT,{
              razorpay_order_id:response.razorpay_order_id,
              razorpay_payment_id:response.razorpay_payment_id,
              razorpay_signature:response.razorpay_signature,
              planId:plan.id,
              
             
        },
        
        {
          headers: { 'Authorization': `Bearer ${token}` }

        });
        if(verifyResponse.data.success){
          if(verifyResponse.data.credits){
            console.log('Updating credits to:',verifyResponse.data.credits)
            setCredits(verifyResponse.data.credits);

          }else{
            console.log('Credits not in respoonse,fetching latest credits');
            await fetchUserCredits();
          }

          setMessage(`Payment successful! ${plan.name} plan activatd successfully.`);
          setMessageType("success");
        
        }
        else{
          setMessage("Payment failed. Please try again.");
          setMessageType("error");
        }
      } catch (error) {
        console.log("Payment verification failed:", error);
        setMessage("Payment verification failed. Please try again.");
        setMessageType("error");
      }
      
    },
    prefill:{
      name: user.fullName,
      email:user.primaryEmailAddress
    },
    notes:{
  },
  theme :{
    color:"#3B82F6"
  }
};
if (window.Razorpay) {
    const razorpay = new window.Razorpay(options);

    razorpay.open();
} else {
  throw new Error("Razorpay script not loaded");
}
} catch (error) {
  console.log("Payment creation failed:", error);
  setMessage("Payment creation failed. Please try again.");
  setMessageType("error");
  
} 
finally{
  setProcessingPayment(false);
}
}

  return (
    <DashboardLayout activeMenu="Subscription">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-gray-600 mb-6">Choose a plan that works for you</p>
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 text-red-700' : messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
           {messageType === 'error' && <AlertCircle size={20} />}
            {message}
          
          </div> 
      
        )}

         <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-purple-500"/>
              <h2 className="text-lg font-medium">Current Credits: <span className="font-semibold text-purple-500">{credits}</span></h2>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              You can Upload {credits} more files with your current credits. 
            </p>
          </div>
         </div>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan)=>(
              <div
              key={plan.id}
             className={`border rounded-xl p-6 ${
              plan.recommended
              ? 'border-purple-200 bg-purple-50'
              : 'border-gray-200 bg-white'
             }`}
              >
                {plan.recommended && (
                  <div className="inline-block bg-purple-500 text-white text-xs font-semibold p-2 rounded-xl">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-500">for {plan.credits} credits</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature ,index)=>(
                    <li key={index} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 shrink-0"/>
                      <span className="text-sm">{feature}</span>

                    </li>
                  ))}
                </ul>
              <button
              onClick={()=>handlePurchase(plan)}
              disabled={processingPayment}
                className={`w-full py-2 rounded-md font-medium transition-colors ${
                  plan.recommended
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {processingPayment ? (
                  <>
                  <Loader2 size={16} className="animate-spin"/>
                  <span>Processing...</span>
                  </>
                ):(
                  <span>Purchase Plan</span>
                )}

              </button>
 

              </div>
            ))}
          </div>
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">How credits work?</h3>
            <p className="text-sm text-gray-600">
              Each file upload 1 credit. New users start with 5 free credits.
              Credits never expire and can be used at any time. If you can run out of credits,
              you can purchase more through our subscription plans.
            </p>
          </div>
         
       </div>
    </DashboardLayout>
  )
 }  
 export default Subscription;