import { Copy, Download, Eye, FileIcon, FileText,  Globe,  Image, Lock, Music, Trash2, Video } from "lucide-react";
import { useState } from "react";

const FileCard =({file, onDownload, onTogglePublic,onDelete,onShareLink})=>{
    const [showActions, setShowActions] = useState(false);
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

    const formatSize =(bytes)=>{
        if(bytes < 1024) return bytes + ' B';
        else if(bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        else if(bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    }
    const formatDate =(dateString)=>{
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return(
      <div
      onMouseEnter={()=>setShowActions(true)}
        onMouseLeave={()=>setShowActions(false)}
       className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ">
        {/* {file view area} */}
         <div className="h-32 bg-linear-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
            {getFileIcon(file)}
         </div>
        {/**public or private */}
        <div className="absolute top-2 right-2">
            <div className={`rounded-full p-1.5 ${file.isPublic ? 'bg-green-200' : 'bg-gray-100'}`} title={file.isPublic ? 'Public' : 'Private'}>
             {file.isPublic ? (
                <Globe size={14} />
             ):(
                <Lock size={14} />
             )}
            </div>
        </div>
        {/* file details */}
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div className="overflow-hidden">
                    <h3 title={file.name} className="font-semibold text-gray-900 truncate">
                        {file.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Size: {formatSize(file.size)} . {formatDate(file.uploadAt)}</p>
                </div>
            </div>
        </div>
        {/* actions */}
       
        <div className={`absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-3 w-full justify-center">
            {file.isPublic && (
                <button 
                onClick={()=> onShareLink(file.id)}     
                title="Share Link"
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-purple-500 hover:text-purple-600 cursor-pointer">

                <Copy size={18}/>
                </button>
            )}

            {file.isPublic && (
                <a href={`/file/${file.id}`} title="View File " target="_blank" rel="noreferrer" className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-gray-700 hover:text-gray-900">
                    <Eye size={18}/>
                </a>
            )}

            <button 
            onClick={()=> onDownload(file)}
            
            title="Download" 
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-gray-500 hover:text-green-600 cursor-pointer">
                <Download size={18}/>
            </button>
            <button 
            onClick={()=> onTogglePublic(file)}
            title={file.isPublic ? "Make Private" : "Make Public"}
             className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-amber-500 hover:text-green-600 cursor-pointer">
              {file.isPublic ? <Lock size={18}/> : <Globe size={18}/>}
            </button>

            <button 
            onClick={()=> onDelete(file.id)}
            title="Delete"
             className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-red-500 hover:text-red-600 cursor-pointer">
                <Trash2 size={18}/>
            </button>
        </div>
        </div>
      </div>
    )
}

export default FileCard;