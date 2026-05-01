import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const SHOE_SIZES = ['40', '41', '42', '43', '44'];
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const APPAREL_CATS = ['Ropa'];

const ProductCard = memo(function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const isApparel = APPAREL_CATS.includes(product.category);
  const sizes = isApparel ? APPAREL_SIZES : SHOE_SIZES;
  const hasSize = !['Accesorios'].includes(product.category);

  const handleAdd = useCallback(
    function addProductToCart(e) {
      e.stopPropagation();
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    },
    [addToCart, product]
  );

  const priceFormatted = product.price.toLocaleString('es-CO', { maximumFractionDigits: 0 });

  return (
    <motion.div
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={s.card}
      animate={{
        boxShadow: isHovered
          ? '0 24px 60px rgba(0,0,0,0.6), 0 4px 20px rgba(230,25,43,0.12)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        borderColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image container */}
      <div style={s.imgWrapper}>
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="skeleton" style={s.skeleton} aria-hidden="true" />
        )}

        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{
            ...s.img,
            opacity: imageLoaded ? 1 : 0,
          }}
          animate={{ scale: isHovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Badges */}
        <div style={s.badges}>
          {product.isNew && (
            <span className="badge badge-red" style={s.badge}>NEW</span>
          )}
          {product.price >= 1000000 && (
            <span style={{ ...s.badgeHot }}>🔥 HOT</span>
          )}
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={s.overlay}
            >
              {/* Size selector */}
              {hasSize && (
                <div style={s.sizeSelector}>
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                      style={{
                        ...s.sizeBtn,
                        ...(selectedSize === size ? s.sizeBtnActive : {}),
                      }}
                      aria-label={`Talla ${size}`}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Add to cart */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                style={{
                  ...s.addBtn,
                  ...(added ? s.addBtnSuccess : {}),
                }}
                aria-label={`Agregar ${product.name} al carrito`}
                id={`add-to-cart-${product.id}`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <i className="bi bi-check2" /> Agregado
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <i className="bi bi-bag-plus" /> Agregar
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div style={s.info}>
        <div style={s.infoTop}>
          <span style={s.category}>{product.category}</span>
          {product.isNew && <span style={s.newDot} aria-hidden="true" />}
        </div>
        <h3 style={s.name}>{product.name}</h3>
        <div style={s.priceRow}>
          <span style={s.price}>$ {priceFormatted}</span>
          <span style={s.currency}>COP</span>
        </div>
      </div>
    </motion.div>
  );
});

const s = {
  card: {
    position: 'relative',
    background: 'var(--bg-elevated)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255,255,255,0.04)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
    display: 'flex',
    flexDirection: 'column',
  },
  imgWrapper: {
    position: 'relative',
    aspectRatio: '1 / 1',
    background: 'var(--bg-card)',
    overflow: 'hidden',
  },
  skeleton: {
    position: 'absolute',
    inset: 0,
    borderRadius: 0,
  },
  img: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.4s ease',
    willChange: 'transform',
  },
  badges: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    zIndex: 2,
  },
  badge: {
    fontSize: '0.58rem',
  },
  badgeHot: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.22rem 0.6rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.56rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: 'rgba(245,158,11,0.15)',
    color: '#f59e0b',
    border: '1px solid rgba(245,158,11,0.3)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.72)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1.2rem',
    zIndex: 3,
  },
  sizeSelector: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sizeBtn: {
    padding: '0.35rem 0.7rem',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--gray-200)',
    fontSize: '0.72rem',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  },
  sizeBtnActive: {
    background: 'var(--red-500)',
    borderColor: 'var(--red-500)',
    color: 'white',
    boxShadow: '0 4px 12px var(--red-glow)',
  },
  addBtn: {
    padding: '0.75rem 1.8rem',
    background: 'var(--red-500)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.75rem',
    fontWeight: '700',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 6px 24px var(--red-glow)',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  addBtnSuccess: {
    background: 'var(--success)',
    boxShadow: '0 6px 24px rgba(34,197,94,0.3)',
  },
  info: {
    padding: '1rem 1.1rem 1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    flex: 1,
  },
  infoTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: '0.62rem',
    fontWeight: '700',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--red-500)',
  },
  newDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--red-500)',
    boxShadow: '0 0 6px var(--red-glow)',
    animation: 'pulse-glow 2s ease infinite',
  },
  name: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.92rem',
    fontWeight: '600',
    color: 'var(--white)',
    lineHeight: 1.35,
    letterSpacing: '0',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.3rem',
    marginTop: '0.2rem',
  },
  price: {
    fontSize: '1.15rem',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--white)',
    letterSpacing: '-0.01em',
  },
  currency: {
    fontSize: '0.65rem',
    color: 'var(--gray-500)',
    fontWeight: '600',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
};

export default ProductCard;