import React from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import {Route,Routes, BrowserRouter } from 'react-router-dom';
import Input from './Input';
import Itinerary from './Itinerary';
import Dest_next from './Dest_next';
import ProtectedRoute from "./ProtectedRoute";



function App() {
  return (
    <div className="App"> 
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/input" element={<ProtectedRoute><Input /> </ProtectedRoute>} />
      <Route path="/itinerary" element={ <ProtectedRoute> <Itinerary /> </ProtectedRoute>} />
      <Route path="/dest_next" element={<ProtectedRoute><Dest_next />  </ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
