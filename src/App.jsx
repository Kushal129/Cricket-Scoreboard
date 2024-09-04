import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";

const App = () => {
  const handleStartGame = (overs) => {
    const gameState = {
      totalOvers: overs,
      currentOver: 1,
      balls: [],
      team1Score: 0,
      team2Score: 0,
      currentScore: 0,
      wickets: 0,
      isTeam1Batting: true,
      gameOver: false,
      showCompletionMessage: false,
    };
    localStorage.setItem("cricketGameState", JSON.stringify(gameState));
  };

  const isHomeAccessible = () => {
    const savedState = JSON.parse(localStorage.getItem("cricketGameState"));
    return savedState && savedState.totalOvers > 0;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage handleStartGame={handleStartGame} />} />
        <Route path="/Home" element={isHomeAccessible() ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
