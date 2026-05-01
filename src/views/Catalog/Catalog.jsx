import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/home/ProductCard';
import { mockProducts } from '../../services/mockData';

const CATEGORIES = ['Todos', 'Jordan', 'Nike', 'Yeezy', 'New Balance', 'Ropa', 'Accesorios'];

const SORT_OPTIONS = [
  { value: 'default', label: 'Por defecto' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más nuevos' },
];

const Catalog = memo(function Catalog() {
  const [filter, setFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const handleFilterChange = useCallback(function changeFilter(cat) {
    setFilter(cat);
  }, []);

  const handleSortChange = useCallback(function changeSort(e) {
    setSortBy(e.target.value);
  }, []);

  const handleClearSearch = useCallback(function clearSearch() {
    setSearch('');
  }, []);

  const filteredProducts = useMemo(function computeFilteredProducts() {
    let result = filter === 'Todos' ? mockProducts : mockProducts.filter(p => p.category === filter);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(function matchesQuery(p) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
        );
      });
    }

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...result].sort((a, b) => b.isNew - a.isNew);
      default:
        return result;
    }
  }, [filter, sortBy, search]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={s.page}
    >
      <div style={s.container}>
        {/* ── Page Header ── */}
        <motion.header
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={s.pageHeader}
        >
          <span className="text-overline">Nuestra colección</span>
          <h1 style={s.title}>
            CATÁLOGO <span className="text-accent">EXCLUSIVO</span>
          </h1>
          <p style={s.subtitle}>
            {mockProducts.length} modelos disponibles. Autenticidad garantizada.
          </p>
        </motion.header>

        {/* ── Controls Bar ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={s.controls}
        >
          {/* Search */}
          <div style={s.searchWrapper}>
            <i className="bi bi-search" style={s.searchIcon} aria-hidden="true" />
            <input
              type="text"
              id="catalog-search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={s.searchInput}
              aria-label="Buscar productos"
              autoComplete="off"
              spellCheck="false"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClearSearch}
                  style={s.clearBtn}
                  aria-label="Limpiar búsqueda"
                >
                  <i className="bi bi-x" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Sort */}
          <div className="select-wrapper" style={s.sortWrapper}>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={handleSortChange}
              className="select"
              style={s.sort}
              aria-label="Ordenar productos"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={s.tabs}
          role="tablist"
          aria-label="Categorías"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              id={`tab-${cat.toLowerCase()}`}
              onClick={() => handleFilterChange(cat)}
              style={{
                ...s.tab,
                ...(filter === cat ? s.tabActive : {}),
              }}
            >
              {cat}
              {filter === cat && (
                <motion.span
                  layoutId="tab-indicator"
                  style={s.tabIndicator}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              {filter === cat && filter !== 'Todos' && (
                <span style={s.tabCount}>{filteredProducts.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Active Filters ── */}
        {(filter !== 'Todos' || search) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={s.activeFilters}
          >
            <span style={s.filterLabel}>Filtros activos:</span>
            {filter !== 'Todos' && (
              <button
                style={s.filterChip}
                onClick={() => setFilter('Todos')}
                aria-label={`Quitar filtro ${filter}`}
              >
                {filter} <i className="bi bi-x" />
              </button>
            )}
            {search && (
              <button
                style={s.filterChip}
                onClick={handleClearSearch}
                aria-label="Quitar búsqueda"
              >
                "{search}" <i className="bi bi-x" />
              </button>
            )}
            <button
              style={s.clearAllBtn}
              onClick={() => { setFilter('Todos'); setSearch(''); }}
            >
              Limpiar todo
            </button>
          </motion.div>
        )}

        {/* ── Products Grid ── */}
        <div style={s.resultsInfo} aria-live="polite" aria-atomic="true">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
        </div>

        <motion.div layout style={s.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={s.empty}
          >
            <i className="bi bi-emoji-frown" style={s.emptyIcon} aria-hidden="true" />
            <h3 style={s.emptyTitle}>Sin resultados</h3>
            <p style={s.emptyText}>
              No encontramos productos que coincidan con tu búsqueda.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => { setFilter('Todos'); setSearch(''); }}
              id="catalog-clear-filters-btn"
            >
              Ver todos los productos
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

const s = {
  page: {
    minHeight: '100vh',
    paddingTop: 'calc(var(--navbar-height) + 4rem)',
    paddingBottom: '6rem',
  },
  container: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 var(--space-8)',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--gray-400)',
    marginTop: '0.3rem',
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
    minWidth: '220px',
  },
  searchIcon: {
    position: 'absolute',
    left: '1.1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--gray-500)',
    fontSize: '0.9rem',
    pointerEvents: 'none',
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: '2.7rem',
    paddingRight: '2.5rem',
  },
  clearBtn: {
    position: 'absolute',
    right: '0.8rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'var(--gray-400)',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0.2rem',
    transition: 'color 0.2s ease',
    zIndex: 1,
  },
  sortWrapper: {
    minWidth: '200px',
  },
  sort: {
    fontSize: '0.88rem',
  },
  tabs: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--border-subtle)',
  },
  tab: {
    position: 'relative',
    padding: '0.55rem 1.2rem',
    borderRadius: 'var(--radius-full)',
    background: 'transparent',
    border: '1px solid var(--border-default)',
    color: 'var(--gray-400)',
    fontSize: '0.8rem',
    fontWeight: '500',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  tabActive: {
    color: 'var(--white)',
    background: 'rgba(230,25,43,0.1)',
    borderColor: 'var(--border-accent)',
  },
  tabIndicator: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'var(--radius-full)',
    background: 'transparent',
    border: '1.5px solid var(--red-500)',
    pointerEvents: 'none',
  },
  tabCount: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '18px',
    height: '18px',
    padding: '0 4px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--red-500)',
    color: 'white',
    fontSize: '0.6rem',
    fontWeight: '700',
  },
  activeFilters: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
  },
  filterLabel: {
    fontSize: '0.78rem',
    color: 'var(--gray-500)',
    letterSpacing: '0.05em',
  },
  filterChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '0.3rem 0.8rem',
    borderRadius: 'var(--radius-full)',
    background: 'rgba(230,25,43,0.1)',
    border: '1px solid var(--border-accent)',
    color: 'var(--red-400)',
    fontSize: '0.75rem',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  clearAllBtn: {
    fontSize: '0.75rem',
    color: 'var(--gray-500)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    transition: 'color 0.2s ease',
  },
  resultsInfo: {
    fontSize: '0.78rem',
    color: 'var(--gray-500)',
    letterSpacing: '0.05em',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    padding: '6rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.2rem',
  },
  emptyIcon: {
    fontSize: '3.5rem',
    color: 'var(--gray-700)',
  },
  emptyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--gray-400)',
  },
  emptyText: {
    color: 'var(--gray-500)',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
};

export default Catalog;
