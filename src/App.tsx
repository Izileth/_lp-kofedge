import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HorizonS from "./pages/home";
import Catalog from "./pages/Catalog";
import Company from "./pages/Company";
import Contacts from "./pages/Contacts";
import SubPage from "./pages/SubPage";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Router>
        <Layout>
          <Routes>
            {/* Index Routes */}
            <Route path="/" element={<HorizonS />} />
            <Route path="/overview" element={<SubPage title="Overview" description="System-wide overview of the XVS tactical ecosystem and Horizon-S capabilities." />} />
            <Route path="/specifications" element={<SubPage title="Specifications" description="Detailed technical specifications and hardware requirements." />} />
            <Route path="/performance" element={<SubPage title="Performance Data" description="Real-time performance metrics and benchmark results from field testing." />} />
            <Route path="/certifications" element={<SubPage title="Certifications" description="International safety and tactical certifications and compliance data." />} />

            {/* Catalog Section */}
            <Route path="/catalog" element={<Catalog />}>
              <Route path="all" element={<SubPage title="All Models" description="Complete list of all available XVS tactical models." />} />
              <Route path="tactical" element={<SubPage title="Tactical Series" description="High-performance tactical units designed for extreme conditions." />} />
              <Route path="night" element={<SubPage title="Night Series" description="Night-vision and low-light optimized tactical equipment." />} />
              <Route path="accessories" element={<SubPage title="Accessories" description="Modular add-ons and support equipment for XVS units." />} />
            </Route>

            {/* Company Section */}
            <Route path="/company" element={<Company />}>
              <Route path="about" element={<SubPage title="About XVS" description="The history and vision behind the XVS tactical revolution." />} />
              <Route path="lab" element={<SubPage title="Research Lab" description="Deep dive into our R&D processes and experimental technologies." />} />
              <Route path="partners" element={<SubPage title="Partners" description="Strategic global partners and distribution networks." />} />
              <Route path="press" element={<SubPage title="Press" description="Official announcements, media kits, and corporate news." />} />
            </Route>

            {/* Contacts Section */}
            <Route path="/contacts" element={<Contacts />}>
              <Route path="touch" element={<SubPage title="Get in Touch" description="Direct communication channels for inquiries and support." />} />
              <Route path="distributors" element={<SubPage title="Distributors" description="Find authorized XVS distributors in your region." />} />
              <Route path="support" element={<SubPage title="Support" description="Technical assistance and maintenance resources." />} />
              <Route path="hq" element={<SubPage title="HQ Location" description="Global headquarters and regional office locations." />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
