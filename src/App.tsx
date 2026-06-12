import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HorizonS from "./pages/home";
import Catalog from "./pages/Catalog";
import Company from "./pages/Company";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HorizonS />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
