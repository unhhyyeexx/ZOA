import React from "react";
import logo from "./logo.svg";
import Login from "./pages/auth/login";
import Prelogin from "./pages/auth/prelogin";
import Signup from "./pages/auth/signup";
import KS from "./pages/auth/kakao/kakaoSignUp"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Prelogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kao" element={<KS />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
