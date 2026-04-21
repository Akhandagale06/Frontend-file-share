import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Copy, Download, Eye, File, FileIcon, FileText, Globe, Grid, Image, List, Lock, Music, Trash2, Video } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard";
import apiEndpoint from "../util/apiEndpoint";
import ConfirmationDialog from "../components/ConfirmationDialog";
import LinkShareModal from "../components/LinkShareModal";

const Myfiles = () => {
  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState({
    isOpen : false,
    fileId : null,
  });

  const [shareModal , setShareModal] = useState({
    isOpen : false,
    fileId : null,
    link:"",
  })



  //fetches the files of the logged in user from the backend
  const fetchFiles = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const token = await getToken();
      if (!token) return;
      
      const response = await axios.get(apiEndpoint.FETCH_FILES, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setFiles(response.data);
      }

    } catch (error) {
      console.error("Error fetching files:", error);
      if (error.response?.status === 403) {
        toast.error("Access denied. Please check your permissions.");
      } else {
        toast.error("Failed to fetch files. Please try again.");
      }
    }
  }

  //toggles the public private status of a file

  const togglePublic =async(fileToUpdate)=>{
    try {
      const token = await getToken();
      await axios.patch(apiEndpoint.TOGGLE_FILE(fileToUpdate.id),{}, { headers: { Authorization: `Bearer ${token}` } })
      
      setFiles(files.map(file=> file.id === fileToUpdate.id ? {...file, isPublic: !file.isPublic} : file));

    } catch (error) {
      console.log("Error toggling file visibility:", error);
      toast.error("Failed to update file visibility. Please try again.", error.message);
    }
  }

  //handle file download
  const handleDownload = async(file)=>{
    try {
      const token = await getToken();
      const response = await axios.get(apiEndpoint.DOWNLOAD_FILE(file.id), { headers: { Authorization: `Bearer ${token}` },responseType:'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); //clean up url object
      
    } catch (error) {
      console.log("Downloading Failed:", error);
      toast.error("Failed to download file. Please try again.", error.message);
    }
  };

  //close delete confirmation dialog
  const closeDeleteConfirmation =()=>{
    setDeleteConfirmationOpen({
      isOpen : false,
      fileId : null,
    })
  }

  //handle file deletion
  const handleDelete = async()=>{
    const fileId = deleteConfirmationOpen.fileId;
    if(!fileId) return;
    try {
      const token = await getToken();
      const response = await axios.delete(apiEndpoint.DELETE_FILE(deleteConfirmationOpen.fileId), { headers: { Authorization: `Bearer ${token}` } });
      if(response.status === 204){
        setFiles(files.filter(file=> file.id !== fileId));
        closeDeleteConfirmation();
      }
      else{
        toast.error("Failed to delete file. Please try again.");
      }
      
      toast.success("File deleted successfully");

    } catch (error) {
      console.log("Error deleting file:", error);
      toast.error("Failed to delete file. Please try again.", error.message);
    }
  }

  //open delete confirmation dialog
  const openDeleteConfirmation =(fileId)=>{
    setDeleteConfirmationOpen({
      isOpen : true,
      fileId 
    })
  }

  // open share link modal
  const openShareModal =(fileId)=>{
    setShareModal({
      isOpen : true,
      fileId ,
      link : `${window.location.origin}/file/${fileId}`
    })
  }

  //close share link modal
  const closeShareModal =()=>{
    setShareModal({
      isOpen : false,
      fileId : null,
      link : ""
    })
  }


  useEffect(() => {
    fetchFiles();
  }, [getToken, isLoaded, isSignedIn]);

  const getFileIcon =(file)=>{
        const extension = file.name.split('.').pop().toLowerCase();
        if(['jpg','jpeg','png','gif','svg','webp'].includes(extension)){
            return <Image size={24} className="text-purple-500"/>
        }
        if(['mp4','avi','mov','mkv','webm'].includes(extension)){
            return <Video size={24} className="text-blue-500"/>
        }
        if(['mp3','wav','ogg','flac','m4a'].includes(extension)){
            return <Music size={24} className="text-green-500"/>
        }
        if(['pdf','doc','docx','txt','rtf'].includes(extension)){
            return <FileText size={24} className="text-amber-500"/>
        } 
        return <FileIcon size={24} className="text-purple-500"/>
    }

  return (
    <DashboardLayout activeMenu="My Files">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Files {files.length}</h1>
          <div className="flex items-center gap-3">
            <List
              size={24}
              onClick={() => setViewMode("list")}
              className={`cursor-pointer transition-colors ${viewMode === "list" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`} />
            <Grid
              size={24}
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer transition-colors ${viewMode === "grid" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`} />
          </div>
        </div>

        {files.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
            <File
              size={60}
              className="text-purple-300 mb-4"
            />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No files uploaded yet
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start uploading your files to see them here....
            </p>
           
           <button
            onClick={() => navigate("/upload")}

            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
              Upload Now
           </button>
              
          </div>

        ) : viewMode ==="grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <FileCard key={file.id} file={file}
              onDelete ={ openDeleteConfirmation}
              onTogglePublic={togglePublic}
              onDownload={handleDownload}
              onShareLink={openShareModal}

              />
            ))}
          </div>
        ):(
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sharing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50 transition-colors ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                       {getFileIcon(file)}
                        {file.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {(file.size / (1024)).toFixed(1)} KB
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(file.uploadAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <button 
                        onClick={()=>togglePublic(file)}
                        className="flex items-center gap-2 cursor-pointer group">
                          {file.isPublic ? (
                            <>
                            <Globe size={16} className="text-green-500 group-hover:text-green-700 transition-colors" />
                            <span className="group-hover:underline">Public</span>
                            </>
                          ):(
                            <>
                            <Lock size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                            <span className="group-hover:underline">Private</span>
                            </>
                          )}
                        </button>
                        {file.isPublic && (
                          <button
                            onClick={() => openShareModal(file.id)}
                            className="flex items-center gap-2 cursor-pointer group text-blue-600"
                          >
                            <Copy size={16}/>
                            <span className="group-hover:underline font-semibold">Share Link</span>
                          </button>
                        )}
                      </div>
                    </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm  font-medium">
                     <div className="grid grid-cols-3 gap-4">
                      <div className="flex justify-center">
                        <button 
                        onClick={()=>handleDownload(file)}
                        title="Download"
                        className="text-gray-500 hover:text-green-600">
                        <Download size={18}/>
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button
                        onClick={() => openDeleteConfirmation(file.id)}
                        title="Delete"
                         className="text-gray-500 hover:text-red-600">
                       <Trash2 size={18}/>
                        </button>
                      </div>
                      <div className="flex justify-center">
                        {file.isPublic ? (
                          <a href={`/file/${file.id}`} target="_blank" rel="noreferrer" title="View File" className="text-gray-600 hover:text-blue-600">
                            <Eye size={18}/>
                          </a>
                        ):(
                          <span className="w-4.5"></span>
                        )}
                      </div>
                     </div>
 
                   </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/** delete confirmation dialog */}
        <ConfirmationDialog 
          isOpen={deleteConfirmationOpen.isOpen}
          onClose={closeDeleteConfirmation}
          message="Are you sure you want to delete this file?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          confirmationButtonClass="bg-red-600 hover:bg-red-700"
        />
        {/** share link modal */}
        <LinkShareModal
          isOpen={shareModal.isOpen}
          onClose={closeShareModal}
          link={shareModal.link}
          title="Share File"
        />

      </div>
    </DashboardLayout>
  )
}


export default Myfiles;