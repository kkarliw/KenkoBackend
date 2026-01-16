import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import OfferSection from "@/components/OfferSection";
import FAQSection from "@/components/FAQSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton"; // ← NUEVA LÍNEA

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <OfferSection />
        <FAQSection />
        <CTAFinalSection />
      </main>
      <Footer />
      <FloatingButton /> {/* ← NUEVA LÍNEA */}
    </div>
  );
};

export default Index;