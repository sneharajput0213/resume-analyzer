import { FaUser, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function CandidateCard() {
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    if (!candidateName.trim() || !githubUrl.trim()) {
      setError("Both fields are required.");
      return;
    }
    navigate("/recruiter/processing");
    try {
      const res = await fetch(`${API_URL}/api/verify-candidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: candidateName, github: githubUrl }),
      });
      const data = await res.json();
      navigate("/recruiter/result", { state: data });
    } catch (err) {
      alert("Could not connect to server. Make sure backend is running.");
      navigate("/recruiter/verify");
    }
  };

  const inputClass = `w-full h-12 px-4 rounded-xl text-sm font-medium outline-none transition-all duration-200
    dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500
    dark:focus:border-primary-600 dark:focus:bg-primary-600/5
    bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400
    focus:border-primary-600 focus:bg-primary-50 focus:ring-2 focus:ring-primary-200/50
    border`;

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 dark:border-white/10 border border-white/60 shadow-xl">
      <form onSubmit={handleVerify} className="space-y-5">

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="candidate-name"
            className="flex items-center gap-2 text-sm font-semibold dark:text-slate-300 text-slate-700">
            <FaUser className="w-3.5 h-3.5 text-primary" />
            Candidate Full Name
          </label>
          <input
            type="text"
            id="candidate-name"
            placeholder="e.g. Priya Sharma"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* GitHub */}
        <div className="space-y-2">
          <label htmlFor="github-url"
            className="flex items-center gap-2 text-sm font-semibold dark:text-slate-300 text-slate-700">
            <FaGithub className="w-3.5 h-3.5 text-primary" />
            GitHub Profile URL
          </label>
          <input
            id="github-url"
            type="url"
            placeholder="https://github.com/username"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className={inputClass}
            required
          />
          <p className="text-xs dark:text-slate-500 text-slate-400 pl-1">
            We analyze contributions, activity, and project quality
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-danger-50 dark:bg-danger/10 border border-danger-200 dark:border-danger/20">
            <span className="text-danger text-sm font-medium">⚠️ {error}</span>
          </div>
        )}

        <button
          type="submit"
          id="verify-candidate-btn"
          className="btn-shine w-full h-14 rounded-2xl font-semibold text-base
            bg-primary text-white
            hover:bg-primary-600
            shadow-lg shadow-primary/30 hover:shadow-primary/50
            transition-all duration-300 hover:-translate-y-0.5"
        >
          🛡️ Verify Candidate
        </button>
      </form>
    </div>
  );
}

export default CandidateCard;