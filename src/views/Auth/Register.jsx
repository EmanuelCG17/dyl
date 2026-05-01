import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoUrl from '../../assets/images/logodyl.png';

function getPasswordStrength(pass) {
  if (!pass) return 0;
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^a-zA-Z0-9]/.test(pass)) score++;
  return score;
}

const strengthLabels = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'];
const strengthColors = ['', 'var(--red-500)', 'var(--warning)', '#84cc16', 'var(--success)'];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(form.password);

  const handleChange = useCallback(function changeField(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async function submitRegister(e) {
    e.preventDefault();
    if (!agreed) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    navigate('/login');
  }, [navigate, agreed]);

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
          <h1 style={s.title}>ÚNETE A DYL</h1>
          <p style={s.subtitle}>Crea tu cuenta y accede al hype</p>
        </div>

        <form onSubmit={handleSubmit} style={s.form} noValidate>
          {/* Name */}
          <div className="field">
            <label htmlFor="reg-name" className="field-label">Nombre completo</label>
            <div className="input-group">
              <i className="bi bi-person input-icon" aria-hidden="true" />
              <input
                id="reg-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="input"
                required
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="reg-email" className="field-label">Email</label>
            <div className="input-group">
              <i className="bi bi-envelope input-icon" aria-hidden="true" />
              <input
                id="reg-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="input"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="reg-password" className="field-label">Contraseña</label>
            <div className="input-group">
              <i className="bi bi-lock input-icon" aria-hidden="true" />
              <input
                id="reg-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input"
                required
                autoComplete="new-password"
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

            {/* Strength meter */}
            {form.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={s.strengthWrapper}
              >
                <div style={s.strengthBars}>
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      style={{
                        ...s.strengthBar,
                        background: i <= strength ? strengthColors[strength] : 'var(--bg-surface)',
                        transition: 'background 0.3s ease',
                      }}
                    />
                  ))}
                </div>
                <span style={{ ...s.strengthLabel, color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </motion.div>
            )}
          </div>

          {/* Confirm password */}
          <div className="field">
            <label htmlFor="reg-confirm" className="field-label">Confirmar contraseña</label>
            <div className="input-group">
              <i className="bi bi-lock-fill input-icon" aria-hidden="true" />
              <input
                id="reg-confirm"
                name="confirm"
                type={showPass ? 'text' : 'password'}
                value={form.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                className="input"
                required
                autoComplete="new-password"
                style={{
                  paddingRight: '2.5rem',
                  borderColor: form.confirm && form.password !== form.confirm
                    ? 'var(--red-500)'
                    : form.confirm && form.password === form.confirm
                      ? 'var(--success)'
                      : undefined,
                }}
              />
              {form.confirm && (
                <i
                  className={`bi ${form.password === form.confirm ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} input-action`}
                  style={{
                    color: form.password === form.confirm ? 'var(--success)' : 'var(--red-500)',
                    fontSize: '0.9rem',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="checkbox-group" htmlFor="reg-terms" style={{ alignItems: 'flex-start', gap: '0.75rem' }}>
            <input
              id="reg-terms"
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{ marginTop: '2px' }}
            />
            <span style={{ fontSize: '0.82rem', color: 'var(--gray-400)', lineHeight: 1.5 }}>
              Acepto los{' '}
              <Link to="/legal" style={{ color: 'var(--red-400)' }}>Términos y Condiciones</Link>
              {' '}y la{' '}
              <Link to="/legal" style={{ color: 'var(--red-400)' }}>Política de Privacidad</Link>
            </span>
          </label>

          {/* Submit */}
          <motion.button
            type="submit"
            className="btn btn-primary btn-full"
            whileHover={{ scale: 1.02, boxShadow: '0 16px 50px rgba(230,25,43,0.4)' }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !agreed}
            id="register-submit-btn"
            style={s.submitBtn}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="spinner" style={{ width: 18, height: 18 }} />
                Creando cuenta...
              </span>
            ) : (
              <>
                <i className="bi bi-person-plus" />
                Crear Cuenta
              </>
            )}
          </motion.button>
        </form>

        <p style={s.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={s.footerLink} id="register-login-link">
            Inicia Sesión
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
    maxWidth: '460px',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  strengthWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginTop: '0.5rem',
    overflow: 'hidden',
  },
  strengthBars: {
    display: 'flex',
    gap: '4px',
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: '3px',
    borderRadius: 'var(--radius-full)',
  },
  strengthLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
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
  footerLink: {
    color: 'var(--red-400)',
    fontWeight: '600',
  },
};

export default Register;