import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Model from './pages/Model';
import Header from './components/Header';
import './App.css';

function App() {
  const imageDetails = {
    width: 524,
    height: 650,
  };

  return (
    <BrowserRouter>
      <Header />
      <AnimatePresenceWrapper imageDetails={imageDetails} />
    </BrowserRouter>
  );
}

// This wrapper is needed because useLocation must be used inside a Router
function AnimatePresenceWrapper({ imageDetails }) {
  const location = useLocation();
  
  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home imageDetails={imageDetails} />} />
        <Route path="/model/:id" element={<Model imageDetails={imageDetails} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;