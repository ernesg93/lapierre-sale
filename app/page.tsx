import CameraScroll from "@/components/CameraScroll";
import PurchaseConfig from "@/components/PurchaseConfig";
import TechSpecs from "@/components/TechSpecs";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <CameraScroll />
      <PurchaseConfig />
      <TechSpecs />
      <TrustSection />
      <FAQ />
      <Footer />
    </main>
  );
}
