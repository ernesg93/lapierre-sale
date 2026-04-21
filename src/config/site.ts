/**
 * Configuración centralizada del sitio.
 * Modificar aquí y se propaga a todos los componentes.
 */
export const siteConfig = {
  // ─── Contacto ────────────────────────────────────────────────────────────
  /** Número de WhatsApp en formato internacional sin '+' ni espacios */
  whatsappNumber: "5356793586",

  /** Mensaje pre-cargado en WhatsApp al hacer click */
  whatsappMessage: "Hola,%20tengo%20interés%20en%20la%20Lapierre.",

  // ─── Metadata del sitio ──────────────────────────────────────────────────
  name: "Lapierre Pulsium SAT",
  title: "Lapierre Híbrida Carbono | Venta Exclusiva",
  description:
    "Oportunidad única: Lapierre con cuadro de carbono, Shimano GRX hidráulico y ruedas DT Swiss GR 1600. Menos de 500km de uso. Gama Gravel & Urbano.",

  /** URL base del sitio (actualizar al desplegar) */
  url: "https://lapierre-sale.vercel.app",

  /** Imagen de Open Graph — aparece cuando se comparte el link */
  ogImage: "/frames/frame-01.webp",

  // ─── Especificaciones técnicas ───────────────────────────────────────────
  specs: {
    condition: "8/10",
    usage: "< 500km",
    category: "Gravel & Urbano",
    frame: "Carbono",
    brakes: "Shimano GRX Hidráulico",
    wheels: "DT Swiss GR 1600",
    drivetrain: "Shimano GRX",
  },
} as const;

/** URL completa de WhatsApp con mensaje pre-cargado */
export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${siteConfig.whatsappMessage}`;
