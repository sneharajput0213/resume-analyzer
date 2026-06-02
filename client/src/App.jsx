import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import VerifyPage from "./pages/VerifyPage";
import ResultPage from "./pages/ResultPage";
import ProcessingPage from "./pages/ProcessingPage";
import RecruiterResultPage from "./pages/RecruiterResultPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recruiter/verify" element={<VerifyPage />} />
          <Route path="/job-seeker/upload" element={<UploadPage />} />
          <Route path="/job-seeker/processing" element={<ProcessingPage />} />
          <Route path="/job-seeker/result" element={<ResultPage />} />
          <Route path="/recruiter/processing" element={<ProcessingPage />} />
          <Route path="/recruiter/result" element={<RecruiterResultPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;