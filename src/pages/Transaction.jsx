import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import apiEndpoint from "../util/apiEndpoint";
import { AlertCircle, Loader, Loader2, Receipt } from "lucide-react";

const Transaction = () => {
  const [transactions,setTransactions] =useState([]);
  const [loading,setLoading] =useState(false);
  const [error,setError] =useState(null);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isLoaded || !isSignedIn) return;
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) return;

        const response = await axios.get(apiEndpoint.GET_TRANSACTIONS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        if (error.response?.status === 403) {
          setError("Access denied. Please check your permissions.");
        } else {
          setError("Failed to fetch transactions. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [getToken, isLoaded, isSignedIn])

  const formatDate =(dataString)=>{
    const options ={
      year:"numeric",
      month:"long",
      day:"numeric",
      hour:"2-digit",
      minute:"2-digit"
    };
    const date = new Date(dataString);
    return date.toLocaleDateString(undefined,options);
    }

    const formatAmount =(amountInPaise)=>{
      return `₹${(amountInPaise/100).toFixed(2)}`
    }
  
  return (
    <DashboardLayout activeMenu="Transaction History">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Receipt className="text-blue-600"/>
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle size={20}/>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={24} className="animate-spin mr-2"/>
            <span>Loading Transactions....</span>
          </div>
        ): transactions.length===0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <Receipt size={48} className="mx-auto mb-4 text-gray-400"/>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No transactions found.
            </h3>
            <p className="text-gray-500">
              You haven't made any credit purchase yet.Visit the Subscription page to buy credits.
            </p>
          </div>
        ):(
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-purple-100 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                   Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Credits Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    PaymentId
                  </th>
                </tr>

              </thead>
            
             <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction)=>(
                <tr key={transaction.id} className="hover:bg-gray-50" >
                    <td className="px-6 py-4 whitespace-nowrap text-sm-text-gray-900">
                      {formatDate(transaction.transactionDate)}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.planId ==="premium"
                        ? "Premium plan"
                      :transaction.planId === "ultimate"
                      ? "Ultimate Plan "
                    : "Basic Plan"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatAmount(transaction.amount)}
                      
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.creditsAdded}

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.paymentId
                        ? transaction.paymentId.substring(0,12)+ "...."
                      :"N/A"}
                      </td>
                    
                </tr>

              ))}
             </tbody>

            </table>
          </div>
        )}


      </div>
    </DashboardLayout>
    )
  }
 

 export default Transaction;