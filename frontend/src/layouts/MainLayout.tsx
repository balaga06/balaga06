import { Outlet, useLocation } from "react-router-dom";
import { SectionProvider } from "../context/SectionContext";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";
import NotificationTicker from "../components/NotificationTicker";

/* ================= LAYOUT ================= */

export default function MainLayout() {
  const location = useLocation();

 
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/pages/about-iqac";

  return (
    <SectionProvider>
      <div className="min-h-screen flex flex-col bg-background">

        {/* ================= TOP ================= */}

        <TopBar />
        <Header />
        <Navbar />
        <NotificationTicker />

        {/* ================= MAIN ================= */}

        <main className="flex-1">

          {/* ✅ HOME PAGE */}
          {isHomePage && (
            <>
              <Hero />
              <Intro />
              <FeatureCards />
            </>
          )}

          {/* ✅ ABOUT IQAC PAGE (NO HERO) */}
          {isAboutPage && (
            <>
              <Intro />
              <FeatureCards />
            </>
          )}

          {/* ✅ OTHER PAGES */}
          {!isHomePage && !isAboutPage && <Outlet />}

        </main>

        {/* ================= FOOTER ================= */}

        <Footer />

      </div>
    </SectionProvider>
  );
}