import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "./pages/index"; // ✅ Your main page

const App = () => {
  return (
    <Router basename="/portfolio"> {/* ✅ Fix: Tell React Router about GitHub Pages' subdirectory */}
      <Routes>
        <Route path="/" element={<Box />} /> {/* ✅ This now correctly loads at /portfolio/ */}
        {/* Future pages can be added here */}
      </Routes>
    </Router>
  );
};

export default App;
