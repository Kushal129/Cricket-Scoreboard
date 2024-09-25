import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";
import ButtonsContainer from "./ButtonsContainer";
import OverContainer from "./OverContainer";
import ScoreDisplay from "./ScoreDisplay";
import '../../src/index.css';
import '../../src/App.css';

const Home = ({ totalOvers }) => {
  const [currentOver, setCurrentOver] = useState(1);
  const [balls, setBalls] = useState([]);
  const [validBalls, setValidBalls] = useState(0); // Track valid balls (excluding no-balls and wides)
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [isTeam1Batting, setIsTeam1Batting] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Switch to Team 2 when overs complete
    if (currentOver > totalOvers) {
      if (isTeam1Batting) {
        setIsTeam1Batting(false);
        resetForNextInning(); // Reset for Team 2
      } else {
        setGameOver(true); // End the game
      }
    }
  }, [currentOver, isTeam1Batting, totalOvers]);

  const handleClick = (type) => {
    if (wickets < 10 && validBalls < 6) { // Allow click if less than 10 wickets and valid balls are under 6
      const newBalls = [...balls, type];
      setBalls(newBalls);

      if (type === "no" || type === "wide") {
        // No increase in valid balls, no over switch
        setCurrentScore(currentScore + 1); // Add extra run for no or wide ball
        if (isTeam1Batting) {
          setTeam1Score(team1Score + 1); // Update team1 score for no/wide ball
        } else {
          setTeam2Score(team2Score + 1); // Update team2 score for no/wide ball
        }
      } else if (type === "wicket") {
        // Wicket falls, increment valid balls
        setWickets(wickets + 1); // Increment wickets
        if (validBalls < 6) {
          setValidBalls(validBalls + 1); // Only increment valid balls if the over is not completed
        }
      } else {
        // Normal run, ensuring valid number conversion
        const runs = Number(type); // Convert to number
        if (!isNaN(runs)) { // Make sure it's a valid number
          setValidBalls(validBalls + 1); // Only valid ball if it's not wide/no
          setCurrentScore(currentScore + runs);
          if (isTeam1Batting) {
            setTeam1Score(team1Score + runs);
          } else {
            setTeam2Score(team2Score + runs);
          }
        }
      }

      // Check if over should end after valid balls reach 6 or if wickets are 10
      if (validBalls + 1 >= 6 || wickets === 10) {
        if (currentOver >= totalOvers) {
          if (isTeam1Batting) {
            setIsTeam1Batting(false);
            resetForNextInning(); // Switch innings
          } else {
            setGameOver(true); // End game after both innings
          }
        } else {
          // Increment over and reset valid ball count
          setCurrentOver(currentOver + 1);
          setValidBalls(0);
          setBalls([]);
        }
      }
    }
  };

  const resetForNextInning = () => {
    setCurrentOver(1);
    setBalls([]);
    setValidBalls(0); // Reset valid balls
    setWickets(0);
    setCurrentScore(0);
  };

  const resetGame = () => {
    setCurrentOver(1);
    setBalls([]);
    setValidBalls(0); // Reset valid balls
    setTeam1Score(0);
    setTeam2Score(0);
    setCurrentScore(0);
    setWickets(0);
    setIsTeam1Batting(true);
    setGameOver(false);
  };

  const endMatch = () => {
    resetGame(); // Reset the game data
    navigate('/'); // Navigate to the home page
  };

  if (gameOver) {
    return <ResultPage team1Score={team1Score} team2Score={team2Score} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className={`flex-1 p-6 flex flex-col items-center justify-center ${isTeam1Batting ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          <h1 className="text-3xl font-bold mb-4">{isTeam1Batting ? "Team 1 Batting" : "Team 2 Batting"}</h1>
          <OverContainer balls={balls} />
          <ScoreDisplay
            currentScore={currentScore}
            totalScore={isTeam1Batting ? team1Score : team2Score}
            wickets={wickets}
            over={currentOver}
            team={isTeam1Batting ? 1 : 2}
            workingBalls={validBalls} // Pass valid balls to ScoreDisplay
          />
        </div>
        <div className="flex-1 bg-gray-900 p-6 text-white flex flex-col items-center justify-center">
          <ButtonsContainer handleClick={handleClick} />
        </div>
      </div>
      {!isTeam1Batting && (
        <div className="bg-yellow-500 text-center p-4 mt-6 text-xl font-bold">
          Target Score for Team 2: <span className="bg-white p-2 rounded-sm">{team1Score + 1}</span>
        </div>
      )}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Reset Game
        </button>
        <button
          onClick={endMatch}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          End Match
        </button>
      </div>
    </div>
  );
};

export default Home;
