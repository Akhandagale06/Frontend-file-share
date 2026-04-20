import { FileText, Image, Music, Video, FileIcon, Clock, MoreVertical, Download, ExternalLink } from "lucide-react";

/**
 * RecentFiles component displays a list of recently uploaded files.
 * @param {Object[]} files - List of file objects 
 */
const RecentFiles = ({ files = [] }) => {
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return <Image size={24} className="text-purple-500" />;
    }
    if (["mp4", "avi", "mov", "mkv", "webm"].includes(extension)) {
      return <Video size={24} className="text-blue-500" />;
    }
    if (["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)) {
      return <Music size={24} className="text-green-500" />;
    }
    if (["pdf", "doc", "docx", "txt", "rtf"].includes(extension)) {
      return <FileText size={24} className="text-amber-500" />;
    }
    return <FileIcon size={24} className="text-gray-500" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Clock size={32} className="text-gray-300" />
        </div>
        <h3 className="text-gray-700 font-medium mb-1">No recent activity</h3>
        <p className="text-gray-400 text-sm max-w-[200px]">
          Start uploading files to see your recent activity here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <Clock size={18} className="text-blue-500" />
          Recent Files
        </h2>
      </div>

      <div className="divide-y divide-gray-50">
        {files.map((file) => (
          <div
            key={file.id}
            className="p-4 hover:bg-gray-50/80 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 bg-white border border-gray-100 rounded-lg shadow-sm group-hover:border-blue-100 transition-colors">
                {getFileIcon(file.name)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate max-w-[200px] md:max-w-[300px]">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-400 font-medium uppercase">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <span className="text-gray-200">|</span>
                  <span className="text-[10px] text-gray-400">
                    {formatDate(file.uploadAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {file.isPublic && (
                <a
                  href={`/file/${file.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all"
                  title="View Public Link"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <button
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                title="More actions"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
