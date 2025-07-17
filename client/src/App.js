import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AirportDashboard from './components/AirportDashboard';
import MachineMap from './components/MachineMap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AirportDashboard />} />
        <Route path="/machine-map" element={<MachineMap />} />
      </Routes>
    </Router>
  );
}

export default App;
