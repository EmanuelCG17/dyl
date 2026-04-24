import React from 'react';

const LocationMap = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Visítanos</h2>
          <p style={styles.subtitle}>Encuentra nuestra tienda física y descubre nuestro catálogo en persona.</p>
        </div>
        
        <div style={styles.mapContainer}>
          {/* Reemplaza el src con el enlace embed de Google Maps de tu tienda real */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127252.12889240436!2d-75.64807469796014!3d6.244223403211516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad05%3A0x42137cfcc7b53b56!2zTWVkZWxsw61uLCBBbnRpb3F1aWE!5e0!3m2!1ses!2sco!4v1682345678901!5m2!1ses!2sco" 
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
  }
};

export default LocationMap;
