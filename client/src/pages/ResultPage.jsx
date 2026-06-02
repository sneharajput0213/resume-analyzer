import { useLocation, useNavigate } from "react-router-dom";
import { FaBriefcase, FaChartLine, FaCheckCircle, FaExclamationTriangle, FaRedo } from 'react-icons/fa';

import { useState, useEffect } from 'react';

function ScoreRing({ score }) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = score >= 80 ? '#7D9D7A' : score >= 50 ? '#C8A45D' : '#C77B7B';
  const label = score >= 80 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work';
  const circumference = 2 * Math.PI * 54;
  
  useEffect(() => {
    let start = 0;
    const duration = 1200; // 1.2s
    const increment = score / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  // Use displayScore for offset so the ring animates alongside the number
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" fill="none" stroke="currentColor"
          className="dark:text-white/10 text-slate-200" strokeWidth="10" />
        <circle cx="70" cy="70" r="54" fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
        <text x="70" y="64" textAnchor="middle" fontSize="28" fontWeight="800" fill={color}>{displayScore}</text>
        <text x="70" y="80" textAnchor="middle" fontSize="11" fill="#94a3b8">out of 100</text>
      </svg>
      <span className="text-sm font-semibold mt-1" style={{ color }}>{label}</span>
    </div>
  );
}

function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || state.error) {
    return (
      <div className="min-h-screen dark:bg-[#080818] bg-slate-50 flex items-center justify-center p-6">
        <div className="glass rounded-3xl p-10 text-center max-w-md">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Analysis Failed</h1>
          <p className="dark:text-slate-400 text-slate-600 mb-6">
            {state?.error || "No data available. Please upload a resume first."}
          </p>
          <button onClick={() => navigate("/job-seeker/upload")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
              bg-primary text-white
              hover:bg-primary-600 transition-all">
            <FaRedo className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }


  const atsBg = state.ats_score >= 80 ? 'dark:bg-success/10 bg-success-100' : state.ats_score >= 50 ? 'dark:bg-warning/10 bg-warning/10' : 'dark:bg-danger/10 bg-danger/10';
  const atsMsg = state.ats_score >= 80 ? "🎉 Great job! Your resume is highly compatible with ATS systems."
    : state.ats_score >= 50 ? "💪 Not bad! There's room to improve your ATS compatibility."
      : "⚠️ Your resume may struggle with ATS. Consider optimizing it.";

  return (
    <div className="min-h-screen dark:bg-[#080818] bg-slate-50 transition-colors duration-300 px-6 pt-28 pb-16">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-96 h-96 top-10 -left-32" />
        <div className="orb orb-blue w-72 h-72 bottom-20 right-0" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded-full bg-primary" />
            <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900">
              Resume Analysis Result
            </h1>
          </div>
          <p className="dark:text-slate-400 text-slate-500 ml-5">AI-powered insights to help you land your dream job</p>
        </div>

        {/* ATS Score Card */}
        <div className={`glass rounded-3xl p-6 sm:p-8 mb-6 ${atsBg} dark:border-white/10 border border-white/60`}>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ScoreRing score={state.ats_score} />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-1">ATS Compatibility Score</h2>
              <p className="dark:text-slate-400 text-slate-500 text-sm mb-4">
                How well your resume passes Applicant Tracking Systems
              </p>
              {/* Progress bar */}
              <div className="w-full h-2.5 dark:bg-white/10 bg-slate-200 rounded-full overflow-hidden mb-4">
                <div className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${state.ats_score}%` }} />
              </div>
              <p className="text-sm dark:text-slate-300 text-slate-700 font-medium">{atsMsg}</p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Skills Detected */}
          <div className="glass rounded-3xl p-6 dark:border-white/10 border border-white/60">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-8 rounded-full bg-primary" />
                <div className="w-2 h-8 rounded-full bg-primary" />
                <div className="w-2 h-8 rounded-full bg-primary" />
              <h2 className="font-bold dark:text-white text-slate-900">Skills Detected</h2>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full dark:bg-success/15 dark:text-success bg-success-100 text-success font-medium">
                {state.skills_detected?.length || 0} found
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.skills_detected?.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium
                  dark:bg-success/15 dark:text-success dark:border-success/20
                  bg-success-100 text-success border border-success-100
                  hover:scale-105 hover:shadow-lg hover:shadow-success/10 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Skills */}
          <div className="glass rounded-3xl p-6 dark:border-white/10 border border-white/60">
            <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  <FaBriefcase className="w-3 h-3" />
                </div>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full dark:bg-warning/15 dark:text-warning bg-warning/10 text-warning font-medium">
                {state.recommended_skills?.length || 0} suggestions
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.recommended_skills?.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium
                  dark:bg-warning/15 dark:text-warning dark:border-warning/20
                  bg-warning/10 text-warning border border-warning/20
                  hover:scale-105 hover:shadow-lg hover:shadow-warning/10 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="glass rounded-3xl p-6 sm:p-8 mb-6 dark:border-white/10 border border-white/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-secondary-100 dark:bg-secondary/20 flex items-center justify-center">
              <FaChartLine className="w-4 h-4 text-secondary dark:text-secondary" />
            </div>
            <h2 className="font-bold dark:text-white text-slate-900">Improvement Suggestions</h2>
          </div>
          <div className="space-y-3">
            {state.improvement_suggestions?.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl
                dark:bg-white/5 dark:hover:bg-primary-600/8 bg-slate-50 hover:bg-primary-50
                transition-colors duration-200">
                <div className="w-7 h-7 rounded-xl bg-primary
                  flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Job Matches */}
        <div className="glass rounded-3xl p-6 sm:p-8 dark:border-white/10 border border-white/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary/20 flex items-center justify-center">
              <FaBriefcase className="w-4 h-4 text-primary dark:text-primary" />
            </div>
            <h2 className="font-bold dark:text-white text-slate-900">Top Job Matches</h2>
          </div>
          <div className="space-y-3">
            {state.job_matches?.map((job, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl
                dark:bg-white/5 dark:hover:bg-primary-600/10 dark:border-white/5
                bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200
                transition-all duration-200 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary
                    flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white text-slate-900 text-sm">{job.title}</h3>
                    <p className="text-xs dark:text-slate-400 text-slate-500">{job.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-primary">
                    {job.match_score}%
                  </div>
                  <div className="text-xs dark:text-slate-500 text-slate-400">match</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button onClick={() => navigate("/job-seeker/upload")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm
              dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/10
              bg-white hover:bg-slate-50 text-slate-700 border border-slate-200
              transition-all duration-200 shadow-sm">
            <FaRedo className="w-3.5 h-3.5" /> Analyze Another Resume
          </button>
        </div>

      </div>
    </div>
  );
}

export default ResultPage;