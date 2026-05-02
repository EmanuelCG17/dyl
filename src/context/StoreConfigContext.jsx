/**
 * StoreConfigContext.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Contexto global de configuración de la tienda.
 * Lee/escribe en localStorage. Cuando exista backend, solo cambia readConfig/writeConfig.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

const CFG_KEY = 'dyl_config:v1';

export const DEFAULT_CONFIG = {
  storeName: 'DYL Importaciones',
  storeEmail: 'contacto@dyl.com',
  storePhone: '+57 300 000 0000',
  storeAddress: 'Bogotá, Colombia',
  currency: 'COP',
  shippingCost: 15000,
  freeShippingThreshold: 500000,
  maintenanceMode: false,
  allowRegistrations: true,
  maxCartItems: 10,
  instagramUrl: 'https://instagram.com/dyl_importaciones',
  whatsappNumber: '573000000000',
};

function readConfig() {
  try {
    const raw = localStorage.getItem(CFG_KEY);
    return raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

function writeConfig(cfg) {
  try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch {}
}

// ─── Context ─────────────────────────────────────────────────────────────────
const StoreConfigContext = createContext(null);

export function useStoreConfig() {
  const ctx = useContext(StoreConfigContext);
  if (!ctx) throw new Error('useStoreConfig debe usarse dentro de <StoreConfigProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function StoreConfigProvider({ children }) {
  const [config, setConfig] = useState(() => readConfig());

  // Sincroniza el título de la página con el nombre de la tienda
  useEffect(function syncDocTitle() {
    document.title = config.storeName;
  }, [config.storeName]);

  const saveConfig = useCallback(function saveStoreConfig(newCfg) {
    writeConfig(newCfg);
    setConfig(newCfg);
  }, []);

  const value = useMemo(() => ({ config, saveConfig }), [config, saveConfig]);

  return (
    <StoreConfigContext.Provider value={value}>
      {children}
    </StoreConfigContext.Provider>
  );
}
