import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"
import Ddalgo from "./Components/line_draw/Ddalgo"
import Brehensam from "./Components/line_draw/Brehensam"
import NoPage from "./NoPage"
import CircleDraw from "./Components/circle_draw/CircleDraw"
import Scheduling from './Components/scheduling/Scheduling';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<App />} />
          <Route path="/ddaalgo" element={<Ddalgo />} />
          <Route path="/brehensam" element={<Brehensam />} />
          <Route path="/circledraw" element={<CircleDraw />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router />
);
