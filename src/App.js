import React from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./Containers/Auth";
import Home from "./Containers/Home";
function App() {
  return (
    <Routes>
      <Route path="auth/*" element={<Auth />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
