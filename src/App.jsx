import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Model from './pages/Model';
import { Box } from './pages/index'; // Import the Box component from index.jsx
import Header from './components/Header';
import './App.css';

function App() {
  const imageDetails = {
    width: 524,
    height: 650,
  };

  return (
    <BrowserRouter>
      <AnimatePresenceWrapper imageDetails={imageDetails} />
    </BrowserRouter>
  );
}

// This wrapper is needed because useLocation must be used inside a Router
function AnimatePresenceWrapper({ imageDetails }) {
  const location = useLocation();
  
  // Only show the header on routes other than the landing page
  const showHeader = location.pathname !== "/";
  
  return (
    <>
      {showHeader && <Header />}
      <AnimatePresence initial={false} mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Box />} />
          <Route path="/home" element={<Home imageDetails={imageDetails} />} /> {/* Move Home to /home path */}
          <Route path="/model/:id" element={<Model imageDetails={imageDetails} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;