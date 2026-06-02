import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaGavel, FaGithub, FaRedo,
} from "react-icons/fa";

// ── helpers ──────────────────────────────────────────────────────────────────
function cleanMarkdown(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function extractSection(text, heading) {
  const regex = new RegExp(
    `(?:#{1,3}\\s*)?(?:${heading})[:\\s\\-]*([\\s\\S]*?)(?=\\n#{1,3}\\s*[A-Z]|\\n[A-Z][^\\n]{2,}:|$)`,
    "i"
  );
  const match = text.match(regex);
  if (!match) return [];
  return match[1]
    .split(/\n/)
    .map((l) => l.replace(/^[-•*\d.]+\s*/, "").trim())
    .map(cleanMarkdown)
    .filter(Boolean);
}

function extractScore(text) {
  const match = text.match(/trust\s*score[^\d]*(\d+)/i);
  return match ? parseInt(match[1]) : null;
}

function ScoreRing({ score }) {
  if (score === null) return null;
  const color = score >= 80 ? "#7D9D7A" : score >= 50 ? "#C8A45D" : "#C77B7B";
  const label = score >= 80 ? "High Trust" : score >= 50 ? "Moderate" : "Low Trust";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" fill="none" stroke="currentColor"
          className="dark:text-white/10 text-slate-200" strokeWidth="10" />
        <circle cx="70" cy="70" r="54" fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
        <text x="70" y="64" textAnchor="middle" fontSize="28" fontWeight="800" fill={color}>{score}</text>
        <text x="70" y="80" textAnchor="middle" fontSize="11" fill="#94a3b8">out of 100</text>
      </svg>
      <span className="text-sm font-semibold mt-1" style={{ color }}>{label}</span>
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
function RecruiterResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.result) {
    return (
      <div className="min-h-screen dark:bg-[#080818] bg-slate-50 flex items-center justify-center p-6">
        <div className="glass rounded-3xl p-10 text-center max-w-md">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Verification Failed</h1>
          <p className="dark:text-slate-400 text-slate-600 mb-6">No data available. Please try again.</p>
          <button onClick={() => navigate("/recruiter/verify")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
              bg-primary text-white transition-all">
            <FaRedo className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const raw = state.result;
  const score = extractScore(raw);
  const strengths  = extractSection(raw, "Strengths?");
  const weaknesses = extractSection(raw, "Weaknesses?");
  const redFlags   = extractSection(raw, "Red\\s*Flags?");
  const verdictLines = extractSection(raw, "Final\\s*Verdict");
  const verdict = cleanMarkdown(verdictLines.join(" ") || "");

  const scoreBg = score >= 80
    ? "dark:bg-success/10 bg-success-100"
    : score >= 50
    ? "dark:bg-warning/10 bg-warning/10"
    : "dark:bg-danger/10 bg-danger/10";

  return (
    <div className="min-h-screen dark:bg-[#080818] bg-slate-50 transition-colors duration-300 px-6 pt-28 pb-16">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-96 h-96 top-10 -right-32" />
        <div className="orb orb-cyan w-72 h-72 bottom-20 -left-20" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded-full bg-primary" />
            <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900">
              Verification Result
            </h1>
          </div>
          <p className="dark:text-slate-400 text-slate-500 ml-5">AI-powered candidate trust analysis</p>
        </div>

        {/* Trust Score Card */}
        <div className={`glass rounded-3xl p-6 sm:p-8 mb-6 ${scoreBg} dark:border-white/10 border border-white/60`}>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ScoreRing score={score} />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-1">Trust Score</h2>
              <p className="dark:text-slate-400 text-slate-500 text-sm mb-3">
                {score !== null
                  ? score >= 80
                    ? "This candidate appears highly credible based on their profile."
                    : score >= 50
                    ? "This candidate shows moderate credibility. Review details carefully."
                    : "This candidate has several red flags. Proceed with caution."
                  : "Trust score could not be extracted from the AI response."}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                dark:bg-white/10 dark:text-slate-300 bg-slate-100 text-slate-600">
                <FaGithub className="w-3 h-3" />
                Analyzed via GitHub activity & profile data
              </div>
            </div>
          </div>
        </div>

        {/* Strengths + Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Strengths */}
          <div className="glass rounded-3xl p-6 dark:border-white/10 border border-white/60">
              <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-success-100 dark:bg-success/20 flex items-center justify-center">
                <FaCheckCircle className="w-4 h-4 text-success dark:text-success" />
              </div>
              <h2 className="font-bold dark:text-white text-slate-900">Strengths</h2>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full
                dark:bg-success/15 dark:text-success bg-success-100 text-success font-medium">
                {strengths.length}
              </span>
            </div>
            {strengths.length > 0 ? (
              <div className="space-y-2">
                {strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl
                    dark:bg-success/10 bg-success-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                    <span className="text-sm dark:text-success text-success leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm dark:text-slate-500 text-slate-400">None extracted.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="glass rounded-3xl p-6 dark:border-white/10 border border-white/60">
              <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-warning/10 dark:bg-warning flex items-center justify-center">
                <FaExclamationTriangle className="w-4 h-4 text-warning dark:text-warning" />
              </div>
              <h2 className="font-bold dark:text-white text-slate-900">Weaknesses</h2>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full
                dark:bg-warning/15 dark:text-warning bg-warning/10 text-warning font-medium">
                {weaknesses.length}
              </span>
            </div>
            {weaknesses.length > 0 ? (
              <div className="space-y-2">
                {weaknesses.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl
                    dark:bg-warning/10 bg-warning/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                    <span className="text-sm dark:text-warning text-warning leading-relaxed">{w}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm dark:text-slate-500 text-slate-400">None extracted.</p>
            )}
          </div>
        </div>

        {/* Red Flags */}
        {redFlags.length > 0 && (
          <div className="glass rounded-3xl p-6 mb-6
            dark:bg-danger/10 dark:border-danger/20 bg-danger-100 border border-danger-100">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-danger-100 dark:bg-danger/20 flex items-center justify-center">
                <FaTimesCircle className="w-4 h-4 text-danger dark:text-danger" />
              </div>
              <h2 className="font-bold dark:text-danger text-danger">Red Flags</h2>
            </div>
            <div className="space-y-2">
              {redFlags.map((flag, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl dark:bg-danger/10 bg-danger-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-danger mt-1.5 flex-shrink-0" />
                  <span className="text-sm dark:text-danger text-danger leading-relaxed">{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Verdict */}
        {verdict && (
          <div className="glass rounded-3xl p-6 sm:p-8 mb-6
            dark:border-primary-600/20 border border-primary-100
            dark:bg-primary-600/8 bg-primary-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary/20 flex items-center justify-center">
                <FaGavel className="w-4 h-4 text-primary dark:text-primary" />
              </div>
              <h2 className="font-bold dark:text-white text-slate-900">Final Verdict</h2>
            </div>
            <p className="dark:text-slate-300 text-slate-700 leading-relaxed text-sm">{verdict}</p>
          </div>
        )}

        {/* Raw AI response */}
        <details className="glass rounded-2xl p-4 dark:border-white/5 border border-slate-100 mb-8">
          <summary className="cursor-pointer text-sm dark:text-slate-500 text-slate-400
            hover:dark:text-slate-300 hover:text-slate-600 font-medium select-none">
            View raw AI response
          </summary>
          <pre className="mt-3 text-xs dark:text-slate-500 text-slate-600 whitespace-pre-wrap leading-relaxed">
            {raw}
          </pre>
        </details>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => navigate("/recruiter/verify")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm
              dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/10
              bg-white hover:bg-slate-50 text-slate-700 border border-slate-200
              transition-all duration-200 shadow-sm">
            <FaRedo className="w-3.5 h-3.5" /> Verify Another Candidate
          </button>
        </div>

      </div>
    </div>
  );
}

export default RecruiterResultPage;