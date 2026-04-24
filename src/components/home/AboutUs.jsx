import React from 'react';

const AboutUs = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>Sobre Nosotros</h2>
          <p style={styles.text}>
            En <strong>DYL Importaciones</strong> somos verdaderos <em>locos por los tenis</em>. 
            Nuestra pasión por la cultura sneaker nos llevó a crear este espacio, donde buscamos 
            traerte las mejores siluetas, las marcas más icónicas y la máxima calidad.
          </p>
          <p style={styles.text}>
            No solo vendemos zapatillas; compartimos un estilo de vida. Cada par que importamos 
            es seleccionado pensando en la comodidad, el diseño y esa esencia urbana que nos caracteriza.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1612821745127-53855be9cbd1?auto=format&fit=crop&w=800&q=80" 
            alt="Nuestra pasión por los tenis" 
            style={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '5rem 0',
    backgroundColor: 'var(--color-white)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '4rem',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  title: {
    fontSize: '2.5rem',
    textTransform: 'uppercase',
    color: 'var(--color-primary)',
    marginBottom: '1rem'
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--color-text)'
  },
  imageContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)'
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block'
  }
};

export default AboutUs;
