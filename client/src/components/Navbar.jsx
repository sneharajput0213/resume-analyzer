import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaBrain, FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
            <FaBrain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight dark:text-white text-slate-900 hidden sm:block">
            AI<span className="text-primary">Career</span>
          </span>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium px-4 py-2 rounded-xl
                dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10
                text-slate-600 hover:text-slate-900 hover:bg-slate-100
                transition-all duration-200"
            >
              ← Home
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle"
            className="theme-toggle w-10 h-10 rounded-xl flex items-center justify-center
              dark:bg-white/10 dark:hover:bg-white/20 dark:text-yellow-300
              bg-slate-100 hover:bg-slate-200 text-slate-600
              transition-all duration-200 shadow-sm"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
