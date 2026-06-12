import CameraScroll from "@/components/CameraScroll";
import StickyHeader from "@/components/StickyHeader";
import PurchaseConfig from "@/components/PurchaseConfig";
import TechSpecs from "@/components/TechSpecs";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import FinalAspirationalGallery from "@/components/FinalAspirationalGallery";
import Footer from "@/components/Footer";
import SkipToMainLink from "@/components/SkipToMainLink";

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen bg-white" tabIndex={-1}>
      <SkipToMainLink />
      <StickyHeader />
      <CameraScroll />
      <PurchaseConfig />
      <TechSpecs />
      <TrustSection />
      <FAQ />
      <FinalAspirationalGallery />
      <Footer />
    </main>
  );
}
