import { useSyncExternalStore } from 'react';

const LocationMapInner = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Visítanos</h2>
          <p style={styles.subtitle}>Encuentra nuestra tienda física y descubre nuestro catálogo en persona.</p>
        </div>
        
        <div style={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6587302367625!2d-75.6069492!3d6.1764198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4683237c8d652f%3A0xab63fafd1781e509!2sDyL%20importaciones!5e0!3m2!1ses-419!2sco!4v1777590972078!5m2!1ses-419!2sco" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación DYL Importaciones"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const MapSkeleton = () => (
  <div style={styles.skeleton}>
    <div style={styles.skeletonContent}>
      <div style={styles.skeletonTitle}></div>
      <div style={styles.skeletonText}></div>
      <div style={styles.skeletonMap}></div>
    </div>
  </div>
);

const hydrateServer = () => false;
const hydrateClient = () => true;
const hydrateSubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(hydrateSubscribe, hydrateClient, hydrateServer);
}

export default function LocationMap() {
  const hydrated = useHydrated();

  if (!hydrated) {
    return <MapSkeleton />;
  }

  return <LocationMapInner />;
}

const styles = {
  section: {
    padding: '5rem 0',
    backgroundColor: 'var(--color-light)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '2.5rem',
    textTransform: 'uppercase',
    color: 'var(--color-dark)',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.1rem'
  },
  mapContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)'
  },
  skeleton: {
    padding: '5rem 0',
    backgroundColor: 'var(--color-light)'
  },
  skeletonContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  skeletonTitle: {
    width: '200px',
    height: '40px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '4px',
    margin: '0 auto 3rem',
    animation: 'pulse 2s ease-in-out infinite'
  },
  skeletonText: {
    width: '400px',
    height: '20px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '4px',
    margin: '0 auto 3rem',
    animation: 'pulse 2s ease-in-out infinite'
  },
  skeletonMap: {
    width: '100%',
    height: '450px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '8px',
    animation: 'pulse 2s ease-in-out infinite'
  }
};