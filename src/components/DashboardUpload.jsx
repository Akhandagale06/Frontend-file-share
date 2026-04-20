import { Upload, X, File, CloudUpload } from "lucide-react";
import { useRef } from "react";

const DashboardUpload = ({
  files = [],
  onFileChange,
  uploading = false,
  onRemoveFile,
  remainingUploads = 5,
  onUpload,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <Upload size={18} className="text-purple-500" />
          Quick Upload
        </h2>
      </div>

      <div className="p-6">
        <label
          className={`group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-all
            ${uploading
              ? "bg-gray-50 border-gray-200 cursor-not-allowed"
              : "border-purple-200 bg-purple-50/30 hover:bg-purple-50 hover:border-purple-400 cursor-pointer"
            }`}
        >
          <input
            type="file"
            className="hidden"
            multiple
            onChange={onFileChange}
            disabled={uploading}
            ref={fileInputRef}
          />

          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div
              className={`p-3 rounded-full mb-3 transition-transform group-hover:scale-110 ${uploading ? "bg-gray-100" : "bg-purple-100"
                }`}
            >
              <CloudUpload
                size={28}
                className={uploading ? "text-gray-400" : "text-purple-600"}
              />
            </div>
            <p className="mb-1 text-sm text-gray-700 font-medium">
              <span className="text-purple-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {remainingUploads} uploads remaining
            </p>
          </div>
        </label>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Selected Files
            </p>
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-white rounded shadow-sm">
                    <File size={16} className="text-purple-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-37.5">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                {!uploading && (
                  <button
                    onClick={() => onRemoveFile(index)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={onUpload}
              disabled={uploading}
              className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-sm
                ${uploading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.98]"
                }`}
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUpload;
