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
  finalGallery: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
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

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait';
};

export const FINAL_GALLERY_MAX_IMAGES = 8;

const specs: SaleConfig['specs'] = {
  frame: 'Carbono, talle M (17")',
  brakes: 'Shimano hidráulicos',
  wheels: 'DT Swiss 29" con sistema Ratchet y Schwalbe Marathon Plus 622x50',
  drivetrain: 'SRAM 1x10',
  condition: 'Como nueva',
  usage: 'Poco uso. Horquilla rígida de aluminio ultraliviana.',
};

const finalGalleryImages: GalleryImage[] = [
  {
    src: '/gallery/IMG-1.webp',
    alt: 'Vista completa de la Lapierre Pro Race.',
    width: 1020,
    height: 768,
    orientation: 'landscape',
  },
  {
    src: '/gallery/IMG-2.webp',
    alt: 'Perfil vertical de la Lapierre Pro Race.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
  {
    src: '/gallery/IMG-3.webp',
    alt: 'Detalle vertical de la Lapierre Pro Race.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
  {
    src: '/gallery/IMG-4.webp',
    alt: 'Vista vertical de la Lapierre Pro Race desde otro ángulo.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
  {
    src: '/gallery/IMG-5.webp',
    alt: 'Otro perfil vertical de la Lapierre Pro Race.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
  {
    src: '/gallery/IMG-6.webp',
    alt: 'Detalle visual de la Lapierre Pro Race en formato vertical.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
  {
    src: '/gallery/IMG-7.webp',
    alt: 'Vista aspiracional vertical de la Lapierre Pro Race.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
  {
    src: '/gallery/IMG-8.webp',
    alt: 'Último ángulo vertical de la Lapierre Pro Race.',
    width: 768,
    height: 1020,
    orientation: 'portrait',
  },
];

function createFinalGallery(images: GalleryImage[]): SaleConfig['finalGallery'] {
  return {
    title: 'Una bici así se entiende mejor cuando la mirás de cerca.',
    subtitle: 'Deslizá, abrí las fotos y terminá de verla como corresponde.',
    images: images.slice(0, FINAL_GALLERY_MAX_IMAGES),
  };
}

const sale: SaleConfig = {
  productName: 'Lapierre Pro Race',
  price: '$ 850',
  metadata: {
    title: 'Lapierre Pro Race | Bici híbrida $ 850',
    description:
      'Lapierre Pro Race en venta por $ 850: cuadro de carbono, rápida y liviana para ciudad y terrenos mixtos. Poco uso, como nueva y sin vueltas.',
    ogImage: '/frames/frame-01.webp',
  },
  hero: {
    title: 'Lapierre Pro Race',
    claims: ['Híbrida para ciudad y terrenos mixtos', 'Rápida, liviana y directa', 'Poco uso | como nueva'],
    detailLines: [
      'Cuadro de carbono, talle M (17").',
      'Horquilla rígida de aluminio ultraliviana y ruedas DT Swiss 29" con Ratchet.',
      'Schwalbe Marathon Plus 622x50, SRAM 1x10 y frenos hidráulicos Shimano.',
      'Una sola bici real, poco uso y lista para seguir rodando en ciudad, asfalto y caminos mixtos.',
      'Está como nueva, con poco uso y publicada con información clara.',
    ],
  },
  finalGallery: createFinalGallery(finalGalleryImages),
  footer: {
    heading: 'Lapierre Pro Race',
    blurb: 'Una sola Lapierre Pro Race, poco uso, como nueva y lista para seguir rodando.',
    primaryCtaLabel: 'Hablar por esta Lapierre Pro Race',
  },
  purchaseOptions: [
    {
      id: 'visit',
      title: 'Quiero verla en persona',
      price: 'FREE',
      description: 'Coordinamos una visita para verla con calma y confirmar si es la bici indicada para vos.',
      highlight: false,
    },
    {
      id: 'reserve',
      title: 'Quiero reservar esta bici',
      price: '$ 850',
      badge: 'Directo',
      description:
        'Si ya te cierra, escribime y avanzamos por WhatsApp con el siguiente paso sobre esta misma Lapierre Pro Race.',
      highlight: true,
    },
    {
      id: 'ask',
      title: 'Necesito hacer una consulta',
      price: 'FREE',
      description: 'Si querés confirmar talle, uso o cómo se siente en distintos terrenos, te respondo directo por WhatsApp.',
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
  whatsappMessage: `Hola, me interesa la ${sale.productName}.`,

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
  return `Hola, vi la ${siteConfig.sale.productName} en la web y me interesa avanzar por: ${optionTitle}.`;
}

export function buildPurchaseWhatsAppUrl(optionTitle: string): string {
  return buildWhatsAppUrl(buildPurchaseMessage(optionTitle));
}

/** URL completa de WhatsApp con mensaje pre-cargado */
export const whatsappUrl = buildWhatsAppUrl();
