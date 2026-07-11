import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Notice from "./pages/Notice";
import Contact from "./pages/Contact";
import Admission from "./pages/Admission";
import Gallery from "./pages/Gallery";
import ProgramDetails from "./pages/ProgramDetails";
import Program from "./pages/Program";
import Download from "./pages/Download";
import AdmissionForm from "./pages/AdmissionForm";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/program" element={<Program />} />
        <Route path="/program/:slug" element={<ProgramDetails />} />
        <Route path="/downloads" element={<Download />} />
        <Route path="/admission-form" element={<AdmissionForm />} />
      </Route>
    </Routes>
  );
}

export default App;
