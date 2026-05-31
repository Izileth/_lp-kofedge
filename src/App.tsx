import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Panteao from "./pages/Panteao";
import Reinos from "./pages/Reinos";
import Linhagens from "./pages/Linhagens";
import Mitos from "./pages/Mitos";
import Oraculo from "./pages/Oraculo";
import './index.css';


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Panteao />} />
          <Route path="/reinos" element={<Reinos />} />
          <Route path="/linhagens" element={<Linhagens />} />
          <Route path="/mitos" element={<Mitos />} />
          <Route path="/oraculo" element={<Oraculo />} />
        </Routes>
      </Layout>
    </Router>
  );
}
