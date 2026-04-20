import { useContext, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { UserCreditsContext } from "../context/UserCreditContext";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import apiEndpoint from "../util/apiEndpoint";
import UploadBox from "../components/UploadBox";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { credits, setCredits } = useContext(UserCreditsContext);
  const MAX_FILES = 5;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMessage("");
    setMessageType("");
  };

  // Error handler for UploadBox
  const handleUploadError = (msg) => {
    setMessage(msg);
    setMessageType("error");
  };
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMessage("");
    setMessageType("");

  }

  const handleUpload = async () => {

    if (files.length === 0) {
      setMessage("Please select files to upload.");
      setMessageType("error");
      return;

    }
    if (files.length > MAX_FILES) {
      setMessage(`You can only upload ${MAX_FILES} files at a time.`);
      setMessageType("error");
      return;

    }
    setUploading(true);
    setMessage(" Uploading...");
    setMessageType("info");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

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

      if (response.data && response.data.remainingCredits != undefined) {
        setCredits(response.data.remainingCredits);
      }

      setMessage("File uploaded successfully");
      setMessageType("success");
      setFiles([]);

    } catch (error) {
      console.error("Error uploading files:", error);
      if (error.response?.status === 403) {
        setMessage("Access denied. You might not have enough credits or your account is restricted.");
      } else {
        setMessage("Failed to upload files. Please try again.");
      }
      setMessageType("error");
    }
    finally {
      setUploading(false);
    }


  }
 const isUploadDisabled =
  uploading || (credits || 0) <= 0;


  return (
    <DashboardLayout activeMenu="Upload">
      <div className="p-6">
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 text-red-700' : messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            {messageType === 'error' && <AlertCircle size={20} />}
            {message}
          </div>
        )}

        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
          onUpload={handleUpload}
          remainingCredits={credits}
          uploading={uploading}
          isUploadDisabled={isUploadDisabled}
          onError={handleUploadError}
        />
      </div>
    </DashboardLayout>
  )
}
export default Upload;