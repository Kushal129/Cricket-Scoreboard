import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  const [totalOvers, setTotalOvers] = useState(null);

  const handleStartGame = (overs) => {
    setTotalOvers(overs);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage handleStartGame={handleStartGame} />} />
        <Route path="/Home" element={totalOvers ? <Home totalOvers={totalOvers} /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
