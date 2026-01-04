import Navigation from "@/components/Navigation";
import PropertyWithForm from "@/components/PropertyWithForm";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PropertyWithForm />
      <LocationSection />
      <Footer />
    </main>
  );
}

