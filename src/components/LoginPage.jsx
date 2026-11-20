import { useState } from 'react';
import './LoginPage.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^@?[a-zA-Z0-9._]{3,30}$/;

function getPasswordStrength(value) {
  if (!value) {
    return { score: 0, label: '' };
  }

  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^a-zA-Z0-9]/.test(value) || value.length >= 12) score += 1;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score] };
}

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

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
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
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
    );
  }

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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

export default function LoginPage({ onLoginSuccess, theme, onToggleTheme }) {
  const [view, setView] = useState('login');

  // Sign in state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create account state
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupErrors, setSignupErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  // Forgot password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSentTo, setResetSentTo] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);

  const passwordStrength = getPasswordStrength(signupPassword);

  function handlePasswordKeyEvent(event) {
    if (typeof event.getModifierState === 'function') {
      setCapsLockOn(event.getModifierState('CapsLock'));
    }
  }

  function validateLogin() {
    const nextErrors = {};
    const trimmed = identifier.trim();

    if (!trimmed) {
      nextErrors.identifier = 'Enter your email or username';
    } else if (
      !EMAIL_PATTERN.test(trimmed) &&
      !USERNAME_PATTERN.test(trimmed)
    ) {
      nextErrors.identifier = 'Enter a valid email address or username';
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
      const trimmed = identifier.trim();
      const displayIdentifier = EMAIL_PATTERN.test(trimmed)
        ? trimmed
        : trimmed.startsWith('@')
          ? trimmed
          : `@${trimmed}`;

      onLoginSuccess({
        identifier: displayIdentifier,
        rememberMe,
      });
    }, 450);
  }

  function validateSignup() {
    const nextErrors = {};
    const trimmedName = fullName.trim();
    const trimmedUsername = username.trim().replace(/^@+/, '');
    const trimmedEmail = signupEmail.trim();

    if (!trimmedName) {
      nextErrors.fullName = 'Enter your full name';
    }

    if (!trimmedUsername) {
      nextErrors.username = 'Choose a username';
    } else if (!USERNAME_PATTERN.test(trimmedUsername)) {
      nextErrors.username = 'Use 3 to 30 letters, numbers, dots, or underscores';
    }

    if (!trimmedEmail) {
      nextErrors.signupEmail = 'Enter your email address';
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.signupEmail = 'Enter a valid email address';
    }

    if (!signupPassword) {
      nextErrors.signupPassword = 'Create a password';
    } else if (signupPassword.length < 8) {
      nextErrors.signupPassword = 'Password must be at least 8 characters';
    }

    return nextErrors;
  }

  function handleSignupSubmit(event) {
    event.preventDefault();
    const validationErrors = validateSignup();
    setSignupErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsCreating(true);

    // Local simulated account creation; no data is sent or stored externally.
    setTimeout(() => {
      setIsCreating(false);
      const cleanHandle = username.trim().replace(/^@+/, '');
      onLoginSuccess({
        identifier: `@${cleanHandle}`,
        fullName: fullName.trim(),
        rememberMe: false,
      });
    }, 450);
  }

  function openForgotPassword() {
    const trimmed = identifier.trim();
    setResetEmail(EMAIL_PATTERN.test(trimmed) ? trimmed : '');
    setResetError('');
    setResetSentTo('');
    setView('forgot');
  }

  function switchView(nextView) {
    setErrors({});
    setSignupErrors({});
    setResetError('');
    setResetSentTo('');
    setCapsLockOn(false);
    setView(nextView);
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

  const headingId =
    view === 'login'
      ? 'login-heading'
      : view === 'signup'
        ? 'signup-heading'
        : 'reset-heading';

  return (
    <main className="auth-shell">
      <div className="auth-frame">
        <EditorialShowcase />

        <section className="auth-panel" aria-labelledby={headingId}>
          <div className="auth-panel-inner">
            <div className="panel-topbar">
              <div className="brand-row">
                <span className="brand-glyph">
                  <CameraGlyph />
                </span>
                <span className="brand-wordmark">Instagram</span>
              </div>

              <button
                type="button"
                className="theme-toggle"
                onClick={onToggleTheme}
                aria-label={
                  theme === 'dark'
                    ? 'Switch to light theme'
                    : 'Switch to dark theme'
                }
                title={
                  theme === 'dark'
                    ? 'Switch to light theme'
                    : 'Switch to dark theme'
                }
              >
                <ThemeIcon theme={theme} />
              </button>
            </div>

            {view === 'login' && (
              <div key="login-view" className="view-enter">
                <header className="panel-header">
                  <h1 id="login-heading" className="panel-title">
                    Sign in to Instagram
                  </h1>
                  <p className="panel-subtitle">
                    Use your email or username to open your feed
                  </p>
                </header>

                <form
                  className="auth-form"
                  onSubmit={handleLoginSubmit}
                  noValidate
                >
                  <div className="field-group">
                    <label htmlFor="identifier" className="field-label">
                      Email or username
                    </label>
                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      placeholder="name@example.com or @username"
                      className={`field-input ${
                        errors.identifier ? 'field-input-error' : ''
                      }`}
                      value={identifier}
                      onChange={(event) => {
                        setIdentifier(event.target.value);
                        if (errors.identifier) {
                          setErrors((prev) => ({
                            ...prev,
                            identifier: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(errors.identifier)}
                      aria-describedby={
                        errors.identifier ? 'identifier-error' : undefined
                      }
                      disabled={isSubmitting}
                    />
                    {errors.identifier && (
                      <p
                        id="identifier-error"
                        className="field-error"
                        role="alert"
                      >
                        {errors.identifier}
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
                        onKeyDown={handlePasswordKeyEvent}
                        onKeyUp={handlePasswordKeyEvent}
                        onBlur={() => setCapsLockOn(false)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password
                            ? 'password-error'
                            : capsLockOn
                              ? 'caps-warning'
                              : undefined
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
                    {capsLockOn && !errors.password && (
                      <p id="caps-warning" className="field-hint" role="status">
                        Caps Lock is on
                      </p>
                    )}
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

                <footer className="panel-footer">
                  <span>New to Instagram?</span>
                  <button
                    type="button"
                    className="text-link-button"
                    onClick={() => switchView('signup')}
                    disabled={isSubmitting}
                  >
                    Create account
                  </button>
                </footer>
              </div>
            )}

            {view === 'signup' && (
              <div key="signup-view" className="view-enter">
                <header className="panel-header">
                  <h1 id="signup-heading" className="panel-title">
                    Create account
                  </h1>
                  <p className="panel-subtitle">
                    Set up your profile to start sharing photographs
                  </p>
                </header>

                <form
                  className="auth-form auth-form-compact"
                  onSubmit={handleSignupSubmit}
                  noValidate
                >
                  <div className="field-group">
                    <label htmlFor="full-name" className="field-label">
                      Full name
                    </label>
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Amina Rahman"
                      className={`field-input ${
                        signupErrors.fullName ? 'field-input-error' : ''
                      }`}
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value);
                        if (signupErrors.fullName) {
                          setSignupErrors((prev) => ({
                            ...prev,
                            fullName: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(signupErrors.fullName)}
                      aria-describedby={
                        signupErrors.fullName ? 'full-name-error' : undefined
                      }
                      disabled={isCreating}
                    />
                    {signupErrors.fullName && (
                      <p
                        id="full-name-error"
                        className="field-error"
                        role="alert"
                      >
                        {signupErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="username" className="field-label">
                      Username
                    </label>
                    <div className="prefix-wrapper">
                      <span className="input-prefix" aria-hidden="true">
                        @
                      </span>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        placeholder="amina.studio"
                        className={`field-input prefix-input ${
                          signupErrors.username ? 'field-input-error' : ''
                        }`}
                        value={username}
                        onChange={(event) => {
                          setUsername(event.target.value.replace(/^@+/, ''));
                          if (signupErrors.username) {
                            setSignupErrors((prev) => ({
                              ...prev,
                              username: undefined,
                            }));
                          }
                        }}
                        aria-invalid={Boolean(signupErrors.username)}
                        aria-describedby={
                          signupErrors.username ? 'username-error' : undefined
                        }
                        disabled={isCreating}
                      />
                    </div>
                    {signupErrors.username && (
                      <p
                        id="username-error"
                        className="field-error"
                        role="alert"
                      >
                        {signupErrors.username}
                      </p>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="signup-email" className="field-label">
                      Email address
                    </label>
                    <input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      className={`field-input ${
                        signupErrors.signupEmail ? 'field-input-error' : ''
                      }`}
                      value={signupEmail}
                      onChange={(event) => {
                        setSignupEmail(event.target.value);
                        if (signupErrors.signupEmail) {
                          setSignupErrors((prev) => ({
                            ...prev,
                            signupEmail: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(signupErrors.signupEmail)}
                      aria-describedby={
                        signupErrors.signupEmail
                          ? 'signup-email-error'
                          : undefined
                      }
                      disabled={isCreating}
                    />
                    {signupErrors.signupEmail && (
                      <p
                        id="signup-email-error"
                        className="field-error"
                        role="alert"
                      >
                        {signupErrors.signupEmail}
                      </p>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="signup-password" className="field-label">
                      Password
                    </label>
                    <div className="password-wrapper">
                      <input
                        id="signup-password"
                        name="signup-password"
                        type={showSignupPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        className={`field-input password-input ${
                          signupErrors.signupPassword ? 'field-input-error' : ''
                        }`}
                        value={signupPassword}
                        onChange={(event) => {
                          setSignupPassword(event.target.value);
                          if (signupErrors.signupPassword) {
                            setSignupErrors((prev) => ({
                              ...prev,
                              signupPassword: undefined,
                            }));
                          }
                        }}
                        onKeyDown={handlePasswordKeyEvent}
                        onKeyUp={handlePasswordKeyEvent}
                        onBlur={() => setCapsLockOn(false)}
                        aria-invalid={Boolean(signupErrors.signupPassword)}
                        aria-describedby={
                          signupErrors.signupPassword
                            ? 'signup-password-error'
                            : undefined
                        }
                        disabled={isCreating}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowSignupPassword((prev) => !prev)}
                        aria-label={
                          showSignupPassword ? 'Hide password' : 'Show password'
                        }
                        aria-pressed={showSignupPassword}
                        disabled={isCreating}
                      >
                        <EyeIcon visible={showSignupPassword} />
                      </button>
                    </div>

                    {signupPassword && (
                      <div
                        className="strength-row"
                        aria-label={`Password strength: ${passwordStrength.label}`}
                      >
                        <div className="strength-bars" aria-hidden="true">
                          {[1, 2, 3, 4].map((step) => (
                            <span
                              key={step}
                              className={`strength-bar ${
                                step <= passwordStrength.score
                                  ? `strength-level-${passwordStrength.score}`
                                  : ''
                              }`}
                            />
                          ))}
                        </div>
                        <span className="strength-label">
                          {passwordStrength.label}
                        </span>
                      </div>
                    )}

                    {capsLockOn && !signupErrors.signupPassword && (
                      <p className="field-hint" role="status">
                        Caps Lock is on
                      </p>
                    )}

                    {signupErrors.signupPassword && (
                      <p
                        id="signup-password-error"
                        className="field-error"
                        role="alert"
                      >
                        {signupErrors.signupPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="primary-button"
                    disabled={isCreating}
                  >
                    {isCreating ? 'Creating account...' : 'Create account'}
                  </button>
                </form>

                <footer className="panel-footer">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    className="text-link-button"
                    onClick={() => switchView('login')}
                    disabled={isCreating}
                  >
                    Sign in
                  </button>
                </footer>
              </div>
            )}

            {view === 'forgot' && (
              <div key="forgot-view" className="view-enter">
                <button
                  type="button"
                  className="back-button"
                  onClick={() => switchView('login')}
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
                        onClick={() => switchView('login')}
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
