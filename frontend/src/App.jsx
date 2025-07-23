import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./utils/Navbar";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import EditDocument from "./pages/EditDocuments";
import Footer from "./pages/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import { Toaster } from "./components/ui/sonner";
import About from "./pages/About";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import UploadLinks from "./pages/UploadLinks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/documents" element={<EditDocument />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/eduction" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/uploadLinks" element={<UploadLinks />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

// import { persistor } from "./store";
// persistor.purge();
