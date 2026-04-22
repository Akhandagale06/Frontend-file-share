import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { UserCreditsContext } from "../context/UserCreditContext";
import axios from "axios";
import apiEndpoint from "../util/apiEndpoint";
import { AlertCircle, Loader2 } from "lucide-react";
import DashboardUpload from "../components/DashboardUpload";
import RecentFiles from "../components/RecentFiles";


const Dashboard =()=>{
    const [files,setFiles]=useState([]);
  const [uploadFiles,setUploadFiles]=useState([]);
  const [uploading,setUploading]=useState(false);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");
  const [messageType,setMessageType]=useState("");
const [remainingUploads,setRemainingUploads]=useState(5);
const {fetchUserCredits}=useContext(UserCreditsContext);
const MAX_FILES=5;
  
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchRecentFiles = async () => {
      if (!isLoaded || !isSignedIn) return;
      setLoading(true);
      try {
        const token = await getToken();
       
        
        if (!token) {
          console.error("No token available");
          return;
        }
        const res = await axios.get(apiEndpoint.FETCH_FILES, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const sortFiles = res.data.sort((a, b) =>
          new Date(b.uploadAt) - new Date(a.uploadAt)
        ).slice(0, 5);
        setFiles(sortFiles);

      } catch (error) {
        console.error("Error fetching recent files...", error);
        if (error.response?.status === 403) {
          setMessage("Access denied. Please ensure your account is set up correctly.");
          setMessageType("error");
        }
      } finally {
        setLoading(false);
      }

    }
    fetchRecentFiles();
  }, [getToken, isLoaded, isSignedIn])

const handleFileChange=(e)=>{
  const selectedFiles =Array.from(e.target.files);

  if(uploadFiles.length + selectedFiles.length > MAX_FILES){
    setMessage(`you can only upload a maximum of ${MAX_FILES} files at a time .`);
    setMessageType('error');
    return;
  }
  setUploadFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  setMessage('');
  setMessageType("");

};

const handleRemoveFile =(index)=>{
  setUploadFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  setMessage("");
  setMessageType("");
}

useEffect(()=>{
  setRemainingUploads(MAX_FILES -uploadFiles.length);

},[uploadFiles])


const handleUpload = async () => {

    if (uploadFiles.length === 0) {
      setMessage("Please select files to upload.");
      setMessageType("error");
      return;

    }
    if (uploadFiles.length > MAX_FILES) {
      setMessage(`You can only upload ${MAX_FILES} files at a time.`);
      setMessageType("error");
      return;

    }
    setUploading(true);
    setMessage(" Uploading...");
    setMessageType("info");

    const formData = new FormData();
    uploadFiles.forEach((file) => formData.append("files", file));

    try {
      const token = await getToken();
      if (!token) {
        setMessage("Authentication token missing. Please sign in again.");
        setMessageType("error");
        setUploading(false);
        return;
      }

      const response = await axios.post(apiEndpoint.UPLOAD_FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("File uploaded successfully");
      setMessageType("success");
      setUploadFiles([]);

      //refresh files 
      const res = await axios.get(apiEndpoint.FETCH_FILES, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const sortFiles = res.data.sort((a, b) =>
        new Date(b.uploadAt) - new Date(a.uploadAt)
      ).slice(0, 5);
      setFiles(sortFiles);
      await fetchUserCredits();

    } catch (error) {
      console.log("Error uploading files:", error);
      setMessage(error.response?.data?.message || "Failed to upload files. Please try again.");
      setMessageType("error");
    }
    finally {
      setUploading(false);
    }


  }


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          My Drive 
        </h1>
        <p className="text-gray-600 mb-6">Upload ,Manage, and Share your file securly </p>
         {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 text-red-700' : messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            {messageType === 'error' && <AlertCircle size={20} />}
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/**Left col */}

          <div className="w-full md:w-[40%]">
            <DashboardUpload
            files={uploadFiles}
            onFileChange={handleFileChange}
            uploading ={uploading}
            onRemoveFile ={handleRemoveFile}
            remainingUploads={remainingUploads}
            onUpload={handleUpload}
            />



          </div>

          {/**right col */}
          <div className="w-full md:w-[60%]">
            {loading ? (
              <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
                <Loader2 size={40} className="text-purple-500 animate-spin mb-4"/>
                <p className="text-gray-500"> Loading your Files...</p>
              </div>
            ):(
              <RecentFiles files={files}/>
            )}
          </div>

        </div>

      </div>
    </DashboardLayout>
    )

  
}
export default Dashboard
