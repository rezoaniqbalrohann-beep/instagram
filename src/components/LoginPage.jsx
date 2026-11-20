import { useState } from 'react';
import './LoginPage.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CameraGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  if (visible) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EditorialShowcase() {
  return (
    <aside className="showcase-panel" aria-hidden="true">
      <div className="showcase-top">
        <span className="frame-meta">35mm · Contact sheet</span>
        <span className="frame-meta">01 — 03</span>
      </div>

      <div className="photo-stack">
        <figure className="print-frame print-back">
          <div className="print-surface print-surface-dusk">
            <div className="horizon-line" />
            <div className="sun-disc" />
          </div>
          <figcaption className="print-caption">
            <span>Lisbon coast</span>
            <span className="frame-meta">f/2.8 · 1/500</span>
          </figcaption>
        </figure>

        <figure className="print-frame print-front">
          <div className="print-surface print-surface-studio">
            <div className="window-light" />
            <div className="table-plane" />
            <div className="ceramic-vessel" />
          </div>
          <figcaption className="print-caption">
            <span>Morning light, studio</span>
            <span className="frame-meta">35mm · 02</span>
          </figcaption>
        </figure>
      </div>

      <div className="showcase-footer">
        <p className="showcase-headline">
          Photographs, stories, and quiet moments with the people you follow
        </p>
      </div>
    </aside>
  );
}

export default function LoginPage({ onLoginSuccess }) {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSentTo, setResetSentTo] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);

  function validateLogin() {
    const nextErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Enter your email address';
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Enter your password';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    return nextErrors;
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    const validationErrors = validateLogin();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // Local simulated sign-in; no credentials are sent or stored externally.
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        email: email.trim(),
        rememberMe,
      });
    }, 450);
  }

  function openForgotPassword(event) {
    event.preventDefault();
    setResetEmail(email.trim());
    setResetError('');
    setResetSentTo('');
    setView('forgot');
  }

  function returnToLogin() {
    setResetError('');
    setResetSentTo('');
    setView('login');
  }

  function handleResetSubmit(event) {
    event.preventDefault();
    const trimmed = resetEmail.trim();

    if (!trimmed) {
      setResetError('Enter the email address on your account');
      return;
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setResetError('Enter a valid email address');
      return;
    }

    setResetError('');
    setIsSendingReset(true);

    // Local simulated reset confirmation; no backend request is made.
    setTimeout(() => {
      setIsSendingReset(false);
      setResetSentTo(trimmed);
    }, 450);
  }

  return (
    <main className="auth-shell">
      <div className="auth-frame">
        <EditorialShowcase />

        <section
          className="auth-panel"
          aria-labelledby={
            view === 'login' ? 'login-heading' : 'reset-heading'
          }
        >
          <div className="auth-panel-inner">
            <div className="brand-row">
              <span className="brand-glyph">
                <CameraGlyph />
              </span>
              <span className="brand-wordmark">Instagram</span>
            </div>

            {view === 'login' ? (
              <div key="login-view" className="view-enter">
                <header className="panel-header">
                  <h1 id="login-heading" className="panel-title">
                    Sign in to Instagram
                  </h1>
                  <p className="panel-subtitle">
                    Enter your email and password to open your feed
                  </p>
                </header>

                <form
                  className="auth-form"
                  onSubmit={handleLoginSubmit}
                  noValidate
                >
                  <div className="field-group">
                    <label htmlFor="email" className="field-label">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      className={`field-input ${
                        errors.email ? 'field-input-error' : ''
                      }`}
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p id="email-error" className="field-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="field-group">
                    <div className="field-label-row">
                      <label htmlFor="password" className="field-label">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-link-button"
                        onClick={openForgotPassword}
                        disabled={isSubmitting}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="password-wrapper">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Password"
                        className={`field-input password-input ${
                          errors.password ? 'field-input-error' : ''
                        }`}
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          if (errors.password) {
                            setErrors((prev) => ({
                              ...prev,
                              password: undefined,
                            }));
                          }
                        }}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password ? 'password-error' : undefined
                        }
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        aria-pressed={showPassword}
                        disabled={isSubmitting}
                      >
                        <EyeIcon visible={showPassword} />
                      </button>
                    </div>
                    {errors.password && (
                      <p
                        id="password-error"
                        className="field-error"
                        role="alert"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      disabled={isSubmitting}
                    />
                    <span>Keep me signed in for 30 days</span>
                  </label>

                  <button
                    type="submit"
                    className="primary-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              </div>
            ) : (
              <div key="forgot-view" className="view-enter">
                <button
                  type="button"
                  className="back-button"
                  onClick={returnToLogin}
                >
                  <ArrowLeftIcon />
                  <span>Back to sign in</span>
                </button>

                <header className="panel-header">
                  <h1 id="reset-heading" className="panel-title">
                    Reset password
                  </h1>
                  <p className="panel-subtitle">
                    {resetSentTo
                      ? 'A simulated recovery link is ready for this demo session'
                      : 'Enter the email linked to your account to receive a reset link'}
                  </p>
                </header>

                {resetSentTo ? (
                  <div className="reset-confirmation" role="status">
                    <div className="confirmation-header">
                      <span className="confirmation-icon">
                        <CheckIcon />
                      </span>
                      <span className="confirmation-title">
                        Reset link prepared
                      </span>
                    </div>
                    <p className="confirmation-body">
                      In a live environment, a password reset link would be sent
                      to <strong>{resetSentTo}</strong>. No email was sent in
                      this local preview.
                    </p>
                    <div className="confirmation-actions">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={returnToLogin}
                      >
                        Return to sign in
                      </button>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setResetSentTo('')}
                      >
                        Use a different email
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="auth-form"
                    onSubmit={handleResetSubmit}
                    noValidate
                  >
                    <div className="field-group">
                      <label htmlFor="reset-email" className="field-label">
                        Email address
                      </label>
                      <input
                        id="reset-email"
                        name="reset-email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        className={`field-input ${
                          resetError ? 'field-input-error' : ''
                        }`}
                        value={resetEmail}
                        onChange={(event) => {
                          setResetEmail(event.target.value);
                          if (resetError) {
                            setResetError('');
                          }
                        }}
                        aria-invalid={Boolean(resetError)}
                        aria-describedby={
                          resetError ? 'reset-email-error' : undefined
                        }
                        disabled={isSendingReset}
                      />
                      {resetError && (
                        <p
                          id="reset-email-error"
                          className="field-error"
                          role="alert"
                        >
                          {resetError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="primary-button"
                      disabled={isSendingReset}
                    >
                      {isSendingReset
                        ? 'Sending reset link...'
                        : 'Send reset link'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
