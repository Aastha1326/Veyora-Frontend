import React from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import {Route,Routes, BrowserRouter } from 'react-router-dom';   //it is used to manage routing in the application, allowing us to define different routes for different components and navigate between them without reloading the page.
import Input from './Input';
import Itinerary from './Itinerary';
import Dest_next from './Dest_next';
import ProtectedRoute from "./ProtectedRoute";



function App() {
  return (    //returns the UI structure of the application.
    <div className="App">     {/*acts as a container for the entire application, allowing us to apply global styles*/} 
    <BrowserRouter>    {/*wraps the entire application to enable routing functionality provided by react-router-dom.*/}
    <Routes>   {/*contains all applications routes, defining which component should be rendered for each path.*/}
       <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/input" element={<ProtectedRoute><Input /> </ProtectedRoute>} />    {/*the Input component is wrapped with ProtectedRoute, which likely checks if the user is authenticated before allowing access to the Input page. If the user is not authenticated, they may be redirected to the login page or shown an error message.*/}
      <Route path="/itinerary" element={ <ProtectedRoute> <Itinerary /> </ProtectedRoute>} />
      <Route path="/dest_next" element={<ProtectedRoute><Dest_next />  </ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
