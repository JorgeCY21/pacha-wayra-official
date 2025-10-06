import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import SiteDetail from "./pages/SiteDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />

      {/* Main content sin limitación de ancho para que el diseño épico fluya */}
      <main className="flex-grow pt-24"> {/* pt-24 para el header fixed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/site/:id" element={<SiteDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;