import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="bg-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-xl text-slate-600 mb-8">
            Page not found
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

