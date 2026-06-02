import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaFileAlt, FaSearch, FaBrain, FaCheckCircle } from "react-icons/fa";

const jobSeekerSteps = [
  { icon: FaFileAlt, label: "Reading your resume",   color: "text-primary" },
  { icon: FaSearch,  label: "Parsing content",        color: "text-secondary" },
  { icon: FaBrain,   label: "AI is analyzing",         color: "text-primary" },
  { icon: FaCheckCircle, label: "Finalizing results", color: "text-success" },
];

const recruiterSteps = [
  { icon: FaSearch,  label: "Scanning GitHub profile", color: "text-primary" },
  { icon: FaBrain,   label: "Evaluating contributions", color: "text-secondary" },
  { icon: FaFileAlt, label: "Building trust report",    color: "text-primary" },
  { icon: FaCheckCircle, label: "Finalizing verdict",  color: "text-success" },
];

function ProcessingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const isRecruiter = location.pathname.includes("recruiter");
  const steps = isRecruiter ? recruiterSteps : jobSeekerSteps;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen dark:bg-[#080818] bg-slate-50 transition-colors duration-300 flex items-center justify-center p-6">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-96 h-96 top-0 left-1/4" />
        <div className="orb orb-blue w-80 h-80 bottom-0 right-1/4" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative text-center max-w-md w-full">

        {/* Spinner */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="w-24 h-24 rounded-full border-4 dark:border-primary-600/20 border-primary-100 border-t-primary-600 animate-spin" />
          <div className="absolute w-16 h-16 rounded-full border-4 dark:border-primary-600/20 border-primary-100 border-b-primary-600 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          <div className="absolute w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <FaBrain className="w-4 h-4 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold dark:text-white text-slate-800 mb-2">
          {isRecruiter ? "Verifying Candidate..." : "Analyzing Your Resume..."}
        </h2>
        <p className="dark:text-slate-400 text-slate-500 mb-10 text-sm">
          Our AI is working hard. This usually takes 5–15 seconds.
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 dark:bg-white/10 bg-slate-200 rounded-full mb-8 overflow-hidden">
          <div
            className="progress-bar h-full rounded-full transition-all duration-[1800ms]"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={index}
                className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-500
                  ${isDone
                    ? 'dark:bg-success/10 dark:border-success/20 bg-success-100 border border-success-100'
                    : isActive
                      ? 'dark:bg-primary-600/10 dark:border-primary-600/30 bg-white border border-primary-200 shadow-sm scale-[1.02]'
                      : 'dark:bg-white/3 dark:border-white/5 bg-white/50 border border-slate-100 opacity-40'
                  }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isDone ? 'dark:bg-success/20 bg-success-100' : isActive ? 'dark:bg-primary-600/20 bg-primary-100' : 'dark:bg-white/5 bg-slate-100'}`}>
                  {isDone
                    ? <FaCheckCircle className="text-success w-4 h-4" />
                    : <Icon className={`w-4 h-4 ${isActive ? step.color : 'dark:text-slate-600 text-slate-400'}`} />
                  }
                </div>
                <span className={`text-sm font-medium flex-1 text-left
                  ${isDone ? 'text-success dark:text-success' : isActive ? 'dark:text-white text-slate-800' : 'dark:text-slate-600 text-slate-400'}`}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="flex gap-1">
                    {[0, 150, 300].map(delay => (
                      <span key={delay}
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProcessingPage;