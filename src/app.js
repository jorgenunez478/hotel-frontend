import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddHotel from './pages/AddHotel';
import EditHotel from './pages/EditHotel';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;