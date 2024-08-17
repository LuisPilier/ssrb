import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Informador from './pages/Informador';
import AdminDashboard from './pages/Admin';
import Comparativa from './pages/comparativa';

function App() {
  return (
    <Router>
      <div className="font-poppins">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/informador" element={<Informador />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/comparativa" element={<Comparativa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
