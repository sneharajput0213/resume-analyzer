import CandidateCard from '../components/CandidateCard';
import { FaGithub, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

const highlights = [
  { icon: FaShieldAlt,         label: 'Trust Score',      desc: 'Overall credibility',       color: 'text-primary', bg: 'dark:bg-primary-600/10 bg-primary-50' },
  { icon: FaGithub,            label: 'GitHub Activity',  desc: 'Contribution patterns',     color: 'text-secondary',   bg: 'dark:bg-secondary/10 bg-secondary-100' },
  { icon: FaExclamationTriangle, label: 'Red Flags',      desc: 'Potential concerns',        color: 'text-danger',    bg: 'dark:bg-danger/10 bg-danger-50' },
];

function VerifyPage() {
  return (
    <div className="min-h-screen dark:bg-[#080818] bg-slate-50 transition-colors duration-300 px-6 pt-28 pb-16">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-80 h-80 top-10 right-0" />
        <div className="orb orb-cyan w-72 h-72 bottom-20 -left-20" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-2xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
            dark:bg-success/10 dark:border-success/30 dark:text-success
            bg-success-100 border border-success-100 text-success">
            <FaShieldAlt className="w-3 h-3" />
            Recruiter · Candidate Verification
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold dark:text-white text-slate-900 mb-4 leading-tight">
            Verify a
            <span className="text-primary"> Candidate</span>
          </h1>
          <p className="dark:text-slate-400 text-slate-600 text-lg">
            AI-powered trust scoring with GitHub analysis, strengths, red flags, and final verdict.
          </p>
        </div>

        {/* Candidate Card Form */}
        <CandidateCard />

        {/* What we analyze */}
        <div className="mt-10">
          <p className="text-center text-sm font-medium dark:text-slate-500 text-slate-400 mb-5 uppercase tracking-widest">
            What we'll analyze
          </p>
          <div className="grid grid-cols-3 gap-4">
            {highlights.map(({ icon: Icon, label, desc, color, bg }) => (
              <div key={label} className={`glass rounded-2xl p-4 text-center ${bg} border border-transparent`}>
                <div className={`${color} flex justify-center mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-sm font-semibold ${color}`}>{label}</div>
                <div className="text-xs dark:text-slate-500 text-slate-500 mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 glass rounded-2xl p-5 dark:border-secondary/20 border border-secondary-100">
          <div className="flex items-start gap-3">
            <FaShieldAlt className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold dark:text-slate-300 text-slate-700 mb-1">Pro Tip</p>
              <p className="text-sm dark:text-slate-400 text-slate-600">
                For best results, provide the candidate's full name exactly as on their resume
                and their complete GitHub profile URL (e.g., https://github.com/username).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
