import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetails from './pages/CourseDetails';
import CheckoutPage from './components/Checkout/CheckoutPage';
import SuccessPage from './components/Checkout/SuccessPage';

function App() {
  return (
    <BrowserRouter basename="/Namastedev">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/checkout/:courseId" element={<CheckoutPage />} />
          <Route path="/checkout/confirmation" element={<SuccessPage />} />
          {/* Add 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;