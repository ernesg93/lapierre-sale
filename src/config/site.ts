/**
 * Configuración centralizada del sitio.
 * Modificar aquí y se propaga a todos los componentes.
 */

type SaleConfig = {
  productName: string;
  price: string;
  metadata: {
    title: string;
    description: string;
    ogImage: string;
  };
  hero: {
    title: string;
    claims: string[];
    detailLines: string[];
  };
  footer: {
    heading: string;
    blurb: string;
    primaryCtaLabel: string;
  };
  purchaseOptions: Array<{
    id: string;
    title: string;
    price: string;
    description: string;
    highlight: boolean;
    badge?: string;
  }>;
  specs: {
    frame: string;
    brakes: string;
    wheels: string;
    drivetrain: string;
    condition: string;
    usage: string;
  };
  techSpecs: Array<{ label: string; value: string }>;
};

const specs: SaleConfig['specs'] = {
  frame: 'Carbono',
  brakes: 'Shimano GRX Hidráulico',
  wheels: 'DT Swiss GR 1600',
  drivetrain: 'Shimano GRX',
  condition: '8/10',
  usage: '< 500km',
};

const sale: SaleConfig = {
  productName: 'Lapierre Híbrida Carbono',
  price: '€ 3.200',
  metadata: {
    title: 'Lapierre Híbrida Carbono | Venta Exclusiva',
    description:
      'Oportunidad única: Lapierre con cuadro de carbono, Shimano GRX hidráulico y ruedas DT Swiss GR 1600. Menos de 500km de uso. Gama Gravel & Urbano.',
    ogImage: '/frames/frame-01.webp',
  },
  hero: {
    title: 'Lapierre Híbrida Carbono',
    claims: ['Gravel & Urbano', '< 1 año', 'Estado 8/10'],
    detailLines: [
      'Cuadro carbono.',
      'Ruedas DT Swiss.',
      'Frenos Shimano Hidráulicos.',
      'Mantenimiento al día. Uso real, sin sorpresas.',
      'Documentación original incluida.',
    ],
  },
  footer: {
    heading: 'Lapierre Híbrida Carbono',
    blurb: 'Una bici espectacular esperando salir a rodar. Lista para entregar.',
    primaryCtaLabel: 'Darle un nuevo hogar a esta Lapierre',
  },
  purchaseOptions: [
    {
      id: 'base',
      title: 'Solo Bici',
      price: '1.200€',
      description: 'Configuración estándar de serie.',
      highlight: false,
    },
    {
      id: 'pack',
      title: 'Pack Completo',
      price: '1.350€',
      badge: 'Ahorra 15€',
      description:
        'Incluye pedales automáticos, 2 portabidones élite, bolsa de sillín y luces recargables.',
      highlight: true,
    },
    {
      id: 'custom',
      title: 'Accesorios por separado',
      price: 'Desde 15€',
      description: 'Elegí qué necesitas sumarle a la base y coordinamos el precio final.',
      highlight: false,
    },
  ],
  specs,
  techSpecs: [
    { label: 'Cuadro', value: specs.frame },
    { label: 'Frenos', value: specs.brakes },
    { label: 'Ruedas', value: specs.wheels },
    { label: 'Transmisión', value: specs.drivetrain },
    { label: 'Estado', value: specs.condition },
    { label: 'Uso', value: specs.usage },
  ],
};

const whatsappBaseUrl = 'https://wa.me';

export const siteConfig = {
  // ─── Contacto ────────────────────────────────────────────────────────────
  /** Número de WhatsApp en formato internacional sin '+' ni espacios */
  whatsappNumber: '5356793586',

  sale,

  /** Precio de venta para mostrar en el header (alias temporal) */
  price: sale.price,

  /** Mensaje pre-cargado en WhatsApp al hacer click */
  whatsappMessage: `Hola, tengo interés en la ${sale.productName}.`,

  // ─── Metadata del sitio ──────────────────────────────────────────────────
  name: sale.productName,
  title: sale.metadata.title,
  description: sale.metadata.description,

  /** URL base del sitio (actualizar al desplegar) */
  url: 'https://lapierre-sale.vercel.app',

  /** Imagen de Open Graph — aparece cuando se comparte el link */
  ogImage: sale.metadata.ogImage,

  // ─── Especificaciones técnicas (alias temporal) ──────────────────────────
  specs: sale.specs,
} as const;

export function buildWhatsAppUrl(message: string = siteConfig.whatsappMessage): string {
  return `${whatsappBaseUrl}/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildPurchaseMessage(optionTitle: string): string {
  return `Hola, vi la ${siteConfig.sale.productName} en la web y me interesa la opción: ${optionTitle}.`;
}

export function buildPurchaseWhatsAppUrl(optionTitle: string): string {
  return buildWhatsAppUrl(buildPurchaseMessage(optionTitle));
}

/** URL completa de WhatsApp con mensaje pre-cargado */
export const whatsappUrl = buildWhatsAppUrl();
