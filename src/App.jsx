import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  if (user) {
    return (
      <main className="auth-shell">
        <section className="session-card" aria-labelledby="session-heading">
          <div className="session-header">
            <span className="session-status">Active session</span>
          </div>
          <h1 id="session-heading" className="panel-title">
            {user.fullName || 'Instagram'}
          </h1>
          <p className="panel-subtitle">
            Signed in as <strong>{user.identifier}</strong>
            {user.rememberMe ? ' · Remembered for 30 days' : ''}
          </p>
          <div className="session-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setUser(null)}
            >
              Sign out
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <LoginPage
      onLoginSuccess={setUser}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}
