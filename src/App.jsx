import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from './pages/index'; // Keep only Box component
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<Box />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
