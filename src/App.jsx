import { HashRouter, Routes, Route } from 'react-router-dom'; // ✅ Change to HashRouter
import { Box } from './pages/index'; 
import './App.css';

function App() {
  return (
    <HashRouter> {/* ✅ Change from BrowserRouter */}
      <Routes>
        <Route path="/" element={<Box />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
