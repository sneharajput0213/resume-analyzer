import { useNavigate } from 'react-router-dom';
import { FaRocket, FaUserTie, FaChartLine, FaShieldAlt, FaBolt, FaStar, FaArrowRight } from 'react-icons/fa';

const stats = [
  { value: '10K+', label: 'Resumes Analyzed', icon: FaChartLine, color: 'text-primary' },
  { value: '98%', label: 'Accuracy Rate',     icon: FaStar,       color: 'text-yellow-500' },
  { value: '5K+', label: 'Candidates Verified', icon: FaShieldAlt, color: 'text-success' },
  { value: '<10s', label: 'Analysis Time',    icon: FaBolt,       color: 'text-secondary' },
];

const features = [
  { icon: '🎯', title: 'ATS Score',       desc: 'Know exactly how your resume scores against applicant tracking systems.' },
  { icon: '🧠', title: 'AI Skill Gap',    desc: 'Identify missing skills and get actionable improvement recommendations.' },
  { icon: '💼', title: 'Job Matching',    desc: 'Discover roles that match your profile with AI-powered job suggestions.' },
  { icon: '🛡️', title: 'Trust Scoring',   desc: 'Verify candidate credibility with GitHub analysis and AI trust metrics.' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get comprehensive analysis in under 10 seconds, powered by Groq AI.' },
  { icon: '🔒', title: 'Privacy First',   desc: 'Your data is analyzed and immediately deleted. Zero storage policy.' },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark:bg-[#080818] bg-slate-50 transition-colors duration-300 overflow-hidden">

      {/* ── Ambient Orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-96 h-96 top-20 -left-32" style={{ animationDuration: '8s' }} />
        <div className="orb orb-blue w-80 h-80 top-40 right-10" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="orb orb-cyan w-64 h-64 bottom-40 left-1/3" style={{ animationDuration: '7s', animationDelay: '4s' }} />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">

        {/* Badge */}
        <div className="animate-slide-up flex items-center gap-2 px-4 py-2 rounded-full mb-8
          dark:bg-primary-600/10 dark:border-primary-600/30 dark:text-primary
          bg-primary-50 border border-primary-200 text-primary
          text-sm font-medium border">
          <FaBolt className="w-3 h-3" />
          ⚡ AI Career Intelligence Platform
        </div>

        {/* Main Heading */}
        <h1 className="animate-slide-up delay-100 text-center font-extrabold leading-tight mb-6
          text-5xl sm:text-6xl lg:text-7xl tracking-tight max-w-4xl">
          <span className="dark:text-white text-slate-900">Your Career,</span>
          <br />
          <span className="text-primary">Supercharged by AI</span>
        </h1>

        {/* Subheading */}
        <p className="animate-slide-up delay-200 text-center text-lg sm:text-xl max-w-2xl mb-12
          dark:text-slate-400 text-slate-600 leading-relaxed">
          Analyze your resume with military-grade ATS scoring, discover skill gaps,
          and let AI match you to your dream job — all in under 10 seconds.
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-4 mb-20">
          <button
            id="job-seeker-cta"
            onClick={() => navigate('/job-seeker/upload')}
            className="btn-shine group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base
              bg-primary text-white
              hover:bg-primary-600
              shadow-lg shadow-primary/30 hover:shadow-primary/50
              transition-all duration-300 hover:-translate-y-1"
          >
            <FaRocket className="w-4 h-4" />
            Analyze My Resume
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="recruiter-cta"
            onClick={() => navigate('/recruiter/verify')}
            className="btn-shine group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base
              dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/20
              bg-white hover:bg-slate-50 text-slate-800 border border-slate-200
              shadow-lg hover:shadow-xl
              transition-all duration-300 hover:-translate-y-1"
          >
            <FaUserTie className="w-4 h-4" />
            Verify a Candidate
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="animate-slide-up delay-400 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="stat-card glass rounded-2xl p-4 text-center">
              <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLE CARDS ── */}
      <section className="relative px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mb-4">
              Choose Your Path
            </h2>
            <p className="dark:text-slate-400 text-slate-600 max-w-xl mx-auto">
              Whether you're hunting your next role or building your dream team — we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Job Seeker Card */}
            <button
              onClick={() => navigate('/job-seeker/upload')}
              className="feature-card group text-left glass rounded-3xl p-8
                dark:hover:border-primary-600/40 hover:border-primary-200
                border border-transparent hover:shadow-2xl dark:hover:shadow-primary/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl mb-6
                group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
                🚀
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-3">
                Job Seeker
              </h3>
              <p className="dark:text-slate-400 text-slate-600 leading-relaxed mb-6">
                Upload your resume and get AI-powered ATS scores, skill gap analysis,
                personalized improvement tips, and top job matches.
              </p>
              <div className="flex flex-wrap gap-2">
                {['ATS Score', 'Skill Gap', 'Job Match', 'AI Tips'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium
                    dark:bg-primary-600/15 dark:text-primary
                    bg-primary-100 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary dark:text-primary font-semibold text-sm">
                Get Started <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Recruiter Card */}
            <button
              onClick={() => navigate('/recruiter/verify')}
              className="feature-card group text-left glass rounded-3xl p-8
                dark:hover:border-success/40 hover:border-success-200
                border border-transparent hover:shadow-2xl dark:hover:shadow-success/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-success flex items-center justify-center text-2xl mb-6
                group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-success/30">
                🛡️
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-3">
                Recruiter
              </h3>
              <p className="dark:text-slate-400 text-slate-600 leading-relaxed mb-6">
                Verify candidate profiles with AI-powered trust scoring, GitHub activity analysis,
                strength/weakness reports, and red flag detection.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Trust Score', 'GitHub Analysis', 'Red Flags', 'Verdict'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium
                      dark:bg-success/15 dark:text-success
                      bg-success-100 text-success">
                    {tag}
                  </span>
                ))}
              </div>
                <div className="mt-6 flex items-center gap-2 text-success dark:text-success font-semibold text-sm">
                Verify Now <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="relative px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="dark:text-slate-400 text-slate-600 max-w-xl mx-auto">
              Powered by state-of-the-art AI to give you an edge in today's competitive job market.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }) => (
              <div key={title}
                className="feature-card glass rounded-2xl p-6
                  dark:hover:border-primary-600/30 hover:border-primary-200
                  border border-transparent">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-base font-semibold dark:text-white text-slate-900 mb-2">{title}</h3>
                <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="relative px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 dark:border-primary-600/20 border border-primary-100">
            <div className="text-5xl mb-4">⚡</div>
            <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-4">
              Ready to Level Up?
            </h2>
            <p className="dark:text-slate-400 text-slate-600 mb-8">
              Join thousands of professionals using AI to land their dream jobs.
            </p>
            <button
              onClick={() => navigate('/job-seeker/upload')}
              className="btn-shine inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold
                bg-primary text-white
                shadow-lg shadow-primary/30 hover:shadow-primary/50
                hover:-translate-y-1 transition-all duration-300"
            >
              <FaRocket className="w-4 h-4" />
              Analyze Your Resume Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm dark:text-slate-600 text-slate-400">
        © 2026 AI Career Intelligence Platform · Developed by <span className="dark:text-primary text-primary font-medium">Sneha</span> ❤️
      </footer>
    </div>
  );
}

export default Home;
