import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messaging from "./pages/Messaging";
import Admin from "./pages/Admin";
import Streaming from "./pages/Streaming";
import Library from "./pages/Library";
import Home from "./pages/Home"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
