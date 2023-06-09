import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import ClaimPost from "./pages/ClaimPost";
import Header from "./components/Header";
import { useState } from "react";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <Header setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/claim" element={<ClaimPost />} />
      </Routes>
    </Router>
  );
}

export default App;
