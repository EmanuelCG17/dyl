import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoUrl from '../../assets/images/logodyl.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async function submitLogin(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);
    navigate('/');
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={s.page}
    >
      {/* Background glow */}
      <div style={s.bgGlow} aria-hidden="true" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={s.card}
        className="glass-panel"
      >
        {/* Logo */}
        <div style={s.logoWrapper}>
          <Link to="/" aria-label="Volver al inicio">
            <img src={logoUrl} alt="DYL" style={s.logo} />
          </Link>
        </div>

        {/* Heading */}
        <div style={s.heading}>
          <h1 style={s.title}>BIENVENIDO</h1>
          <p style={s.subtitle}>Ingresa a tu cuenta exclusiva</p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={s.errorBox}
            role="alert"
          >
            <i className="bi bi-exclamation-triangle" /> {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={s.form} noValidate>
          {/* Email */}
          <div className="field">
            <label htmlFor="login-email" className="field-label">Email</label>
            <div className="input-group">
              <i className="bi bi-envelope input-icon" aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="login-password" className="field-label">Contraseña</label>
            <div className="input-group">
              <i className="bi bi-lock input-icon" aria-hidden="true" />
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
                autoComplete="current-password"
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPass(p => !p)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>

          {/* Options */}
          <div style={s.options}>
            <label className="checkbox-group" htmlFor="login-remember">
              <input
                id="login-remember"
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <Link to="#" style={s.forgotLink}>¿Olvidaste tu clave?</Link>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="btn btn-primary btn-full"
            whileHover={{ scale: 1.02, boxShadow: '0 16px 50px rgba(230,25,43,0.4)' }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            id="login-submit-btn"
            style={s.submitBtn}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="spinner" style={{ width: 18, height: 18 }} />
                Ingresando...
              </span>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right" />
                Iniciar Sesión
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div style={s.dividerRow}>
          <div style={s.dividerLine} />
          <span style={s.dividerText}>o</span>
          <div style={s.dividerLine} />
        </div>

        {/* Google placeholder */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={s.googleBtn}
          id="login-google-btn"
          type="button"
          aria-label="Continuar con Google"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continuar con Google
        </motion.button>

        {/* Footer */}
        <p style={s.footer}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={s.footerLink} id="login-register-link">
            Regístrate gratis
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'calc(var(--navbar-height) + 2rem) 1.5rem 3rem',
    position: 'relative',
  },
  bgGlow: {
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(230,25,43,0.1) 0%, transparent 65%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '3rem 2.5rem',
    borderRadius: 'var(--radius-xl)',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)',
  },
  logoWrapper: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logo: {
    height: '44px',
    margin: '0 auto',
    filter: 'drop-shadow(0 0 10px rgba(230,25,43,0.35))',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.2rem',
    letterSpacing: '0.04em',
    color: 'var(--white)',
    marginBottom: '0.4rem',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: 'var(--gray-400)',
  },
  errorBox: {
    padding: '0.75rem 1rem',
    background: 'rgba(230,25,43,0.1)',
    border: '1px solid rgba(230,25,43,0.3)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--red-400)',
    fontSize: '0.85rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    marginTop: '-0.2rem',
  },
  forgotLink: {
    fontSize: '0.82rem',
    color: 'var(--gray-400)',
    transition: 'color 0.2s ease',
  },
  submitBtn: {
    padding: '1rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.82rem',
    letterSpacing: '0.12em',
    marginTop: '0.4rem',
    gap: '0.6rem',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '1.5rem 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'var(--border-subtle)',
  },
  dividerText: {
    fontSize: '0.75rem',
    color: 'var(--gray-500)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  googleBtn: {
    width: '100%',
    padding: '0.85rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--gray-200)',
    fontSize: '0.85rem',
    fontWeight: '500',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    transition: 'background 0.2s ease, border-color 0.2s ease',
    letterSpacing: '0.02em',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.88rem',
    color: 'var(--gray-400)',
  },
  footerLink: {
    color: 'var(--red-400)',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
};

export default Login;