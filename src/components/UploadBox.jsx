import { Upload as UploadIcon, X, File, CloudUpload } from "lucide-react";
import { useRef, useState } from "react";

const MAX_FILES = 5;

const UploadBox = ({
  files = [],
  onFileChange,
  onRemoveFile,
  onUpload,
  remainingCredits = 0,
  uploading = false,
  isUploadDisabled,
  onError,
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const disabled =
    typeof isUploadDisabled === "function"
      ? isUploadDisabled()
      : isUploadDisabled || uploading;

  const handleFiles = (newFiles) => {
    if (newFiles.length > MAX_FILES) {
      if (onError) onError(`You can only upload ${MAX_FILES} files at a time.`);
      return;
    }
    if (onFileChange) {
      onFileChange({ target: { files: newFiles } });
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);

    // 🔥 reset input so same file can be selected again
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* File limit error message handled by parent via onError */}
      {/* Drop Zone */}
      <label
        htmlFor="file-input"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors block
          ${
            disabled
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : isDragging
              ? "border-blue-500 bg-blue-100"
              : "border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 cursor-pointer"
          }
        `}
      >
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`p-4 rounded-full ${
              disabled ? "bg-gray-200" : "bg-blue-100"
            }`}
          >
            <CloudUpload
              size={48}
              className={disabled ? "text-gray-400" : "text-blue-500"}
            />
          </div>

          <div>
            <p
              className={`text-lg font-medium ${
                disabled ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Drag & drop files here or click to browse
            </p>
            <p className="text-sm mt-1 text-gray-500">
              Maximum {MAX_FILES} files allowed
            </p>
          </div>
        </div>
      </label>

      {/* Credit Warning */}
      {remainingCredits === 0 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
          ⚠️ You have no credits remaining. Upload to earn more credits.
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Selected Files ({files.length})
          </h3>

          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <File size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="p-1.5 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onUpload}
            disabled={disabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium
              ${
                disabled
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            <UploadIcon size={20} />
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadBox;