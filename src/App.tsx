import { useEffect, useState } from 'react';
import './App.css';
import HeaderNav from './components/HeaderNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Services from './components/Services';
import globalStore from './globals';

function App() {
  let validUser:any = globalStore.get("token")
  
    
  
    return (
        <Router>
            <HeaderNav />
            <Routes>
                {/* Redirect root path to /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                {/* {validUser? <Route path="/" element={<Navigate to="/login" replace />}/>: <Route path="/" element={<Navigate to="/login" replace />} />} */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {
                  String(validUser).length>0 && <><Route path="/services" element={<Services />} /><Route path="/home" element={<Home />} /></>
                }
            </Routes>
        </Router>
    );
}

export default App;