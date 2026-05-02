import { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROLES } from '../../features/auth/types';
import logoUrl from '../../assets/images/logodyl.png';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirigir a donde intentaba ir, o al dashboard si es admin
  const from = location.state?.from?.pathname ?? null;

  const handleSubmit = useCallback(async function submitLogin(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login({ email: email.trim(), password });
      // Redirigir según rol
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === ROLES.ADMIN || user.role === ROLES.SUPERADMIN) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate, email, password, from]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={s.page}
    >
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

          {/* Submit */}
          <motion.button
            type="submit"
            className="btn btn-primary btn-full"
            whileHover={{ scale: 1.02, boxShadow: '0 16px 50px rgba(230,25,43,0.4)' }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !email || !password}
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
  logoWrapper: { textAlign: 'center', marginBottom: '2rem' },
  logo: {
    height: '44px',
    margin: '0 auto',
    filter: 'drop-shadow(0 0 10px rgba(230,25,43,0.35))',
  },
  heading: { textAlign: 'center', marginBottom: '2rem' },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.2rem',
    letterSpacing: '0.04em',
    color: 'var(--white)',
    marginBottom: '0.4rem',
  },
  subtitle: { fontSize: '0.88rem', color: 'var(--gray-400)' },
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
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  submitBtn: {
    padding: '1rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.82rem',
    letterSpacing: '0.12em',
    marginTop: '0.4rem',
    gap: '0.6rem',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.88rem',
    color: 'var(--gray-400)',
  },
  footerLink: { color: 'var(--red-400)', fontWeight: '600' },
};

export default Login;