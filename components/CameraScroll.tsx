import CameraScrollAnimator from "./CameraScrollAnimator";
import { siteConfig, whatsappUrl } from "@/src/config/site";

export default function CameraScroll() {
  const sale = siteConfig.sale;

  return (
    <section className="relative min-h-screen w-full overflow-hidden border-b border-slate-200 bg-[#F8FAFC]" aria-label="Hero">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <CameraScrollAnimator />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{sale.productName}</h1>
        <p className="mt-4 text-balance text-lg text-slate-600 md:text-xl">{sale.hero.claims.join(" | ")}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contactar por WhatsApp sobre la ${sale.productName}`}
            className="rounded-full bg-[#A855F7] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#9333EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]"
          >
            Contactar por WhatsApp
          </a>
          <a
            href="#specs"
            className="rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Ver ficha técnica
          </a>
        </div>
      </div>
    </section>
  );
}
