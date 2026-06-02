import { FaUpload } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function UploadCard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setError("");
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setError("");
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await fetch(`${API_URL}/api/upload-resume`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/job-seeker/result", { state: data });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative group p-8 rounded-3xl border-2 border-dashed transition-all duration-300
        ${dragActive 
          ? "border-primary-600 bg-primary-50" 
          : "dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 rounded-2xl bg-primary
            flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <FaUpload className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">
            {selectedFile ? selectedFile.name : "Upload your Resume"}
          </h3>
          <p className="dark:text-slate-400 text-slate-500 mb-6 max-w-xs">
            Drag and drop your PDF here, or click to browse files from your computer.
          </p>

          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".pdf"
            onChange={handleChange}
          />
          
          <label
            htmlFor="file-upload"
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-600 text-white 
              font-semibold transition-all cursor-pointer shadow-lg shadow-primary/25 active:scale-95"
          >
            {selectedFile ? "Change File" : "Choose File"}
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
          {error}
        </div>
      )}

      {selectedFile && !loading && (
        <button
          onClick={handleUpload}
          className="w-full mt-6 py-4 rounded-2xl bg-primary 
            text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          Analyze Resume
        </button>
      )}

      {loading && (
        <div className="w-full mt-6 p-6 rounded-2xl glass relative overflow-hidden">
          {/* Animated laser line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-primary/40 opacity-50 animate-[scan_2s_ease-in-out_infinite]" />
          
          <div className="flex flex-col items-center justify-center gap-3 relative z-10">
            <div className="relative flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border border-primary-600/30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute inset-0 rounded-full border border-primary-200/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
              
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-10">
                <FaUpload className="w-5 h-5 text-white animate-pulse" />
              </div>
            </div>
            
            <div className="text-center mt-2">
              <h4 className="font-bold dark:text-white text-slate-900 text-lg">AI Engine Active</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium dark:text-primary text-primary animate-pulse">
                  Extracting Resume Data & Computing ATS Score...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadCard;