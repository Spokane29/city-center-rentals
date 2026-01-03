import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PhotoGallery from "@/components/PhotoGallery";
import UnitDetails from "@/components/UnitDetails";
import LocationSection from "@/components/LocationSection";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustBar />
      <PhotoGallery />
      <UnitDetails />
      <LocationSection />
      <LeadForm />
      <FAQ />
      <Footer />
    </main>
  );
}

