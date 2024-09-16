import React from "react";
import "./App.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import ErrorPage from "./Components/ErrorPage";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
<<<<<<< HEAD:FE/src/App.jsx
import DN from './Components/DN';
import Home from "./Pages/Home";
function App() {
  return (
    <>
    <div className="">
        <Header className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
    </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<DN />} />
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
=======
import BestSeller from "./Pages/BestSeller";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/bestseller" element={<BestSeller />} />
      </Routes>
>>>>>>> 6df06506c5c7bcf07e9975a47fcb45fbf6eb73a1:src/App.jsx
      <Footer />
    </BrowserRouter>
  );
}

export default App;
