import { useState } from 'react';
import LoginPage from './components/LoginPage.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <main className="auth-shell">
        <section className="session-card" aria-labelledby="session-heading">
          <span className="session-status">Active session</span>
          <h1 id="session-heading" className="panel-title">
            Instagram
          </h1>
          <p className="panel-subtitle">
            Signed in as <strong>{user.email}</strong>
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

  return <LoginPage onLoginSuccess={setUser} />;
}
