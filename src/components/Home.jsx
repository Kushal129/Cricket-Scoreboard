import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";
import ButtonsContainer from "./ButtonsContainer";
import OverContainer from "./OverContainer";
import ScoreDisplay from "./ScoreDisplay";
import '../../src/index.css';

const Home = ({ totalOvers }) => {
  const [currentOver, setCurrentOver] = useState(1);
  const [balls, setBalls] = useState([]);
  const [validBalls, setValidBalls] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [isTeam1Batting, setIsTeam1Batting] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [allOvers, setAllOvers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const oversPerPage = 2;

  const navigate = useNavigate();

  useEffect(() => {
    if (currentOver > totalOvers) {
      if (isTeam1Batting) {
        setIsTeam1Batting(false);
        resetForNextInning();
      } else {
        setGameOver(true);
      }
    }
  }, [currentOver, isTeam1Batting, totalOvers]);

  const handleClick = (type) => {
    if (wickets < 10 && validBalls < 6) {
      const newBalls = [...balls, type];
      setBalls(newBalls);

      if (type === "no" || type === "wide") {
        setCurrentScore(currentScore + 1);
        if (isTeam1Batting) {
          setTeam1Score(team1Score + 1);
        } else {
          setTeam2Score(team2Score + 1);
        }
      } else if (type === "wicket") {
        setWickets(wickets + 1);
        if (validBalls < 6) {
          setValidBalls(validBalls + 1);
        }
      } else {
        const runs = Number(type);
        if (!isNaN(runs)) {
          setValidBalls(validBalls + 1);
          setCurrentScore(currentScore + runs);
          if (isTeam1Batting) {
            setTeam1Score(team1Score + runs);
          } else {
            setTeam2Score(team2Score + runs);
          }
        }
      }

      if (validBalls + 1 >= 6 || wickets === 10) {
        setAllOvers([...allOvers, { over: currentOver, balls: newBalls }]);
        if (currentOver >= totalOvers) {
          if (isTeam1Batting) {
            setIsTeam1Batting(false);
            resetForNextInning();
          } else {
            setGameOver(true);
          }
        } else {
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
    setValidBalls(0);
    setWickets(0);
    setCurrentScore(0);
    setAllOvers([]);
    setCurrentPage(1);
  };

  const resetGame = () => {
    setCurrentOver(1);
    setBalls([]);
    setValidBalls(0);
    setTeam1Score(0);
    setTeam2Score(0);
    setCurrentScore(0);
    setWickets(0);
    setIsTeam1Batting(true);
    setGameOver(false);
    setAllOvers([]);
    setCurrentPage(1);
  };

  const endMatch = () => {
    resetGame();
    navigate('/');
  };

  if (gameOver) {
    return <ResultPage team1Score={team1Score} team2Score={team2Score} />;
  }

  const indexOfLastOver = currentPage * oversPerPage;
  const indexOfFirstOver = indexOfLastOver - oversPerPage;
  const currentOvers = allOvers.slice(indexOfFirstOver, indexOfLastOver);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-black m-2 p-4">
      <div className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto w-full">
        {/* Scoreboard Side */}
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {isTeam1Batting ? "Team 1 Batting" : "Team 2 Batting"}
          </h1>
          <hr className="border-t-2 border-gray-300 my-4" />
          <ScoreDisplay
            currentScore={currentScore}
            wickets={wickets}
            currentOver={currentOver}
            validBalls={validBalls}
          />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Current Over: {currentOver} - Start</h2>
            <OverContainer balls={balls} />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Previous Overs</h2>
            {currentOvers.map((over, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium mb-1 text-center">Over {over.over}</h3>
                <OverContainer balls={over.balls} />
              </div>
            ))}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(allOvers.length / oversPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          {!isTeam1Batting && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6 text-center">
              <p className="font-bold">Target Score for Team 2:</p>
              <p className="text-2xl">{team1Score + 1}</p>
            </div>
          )}
        </div>

        {/* Run Count Buttons Side */}
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Run Counter</h2>
          <div className="space-y-4">
            <ButtonsContainer handleClick={handleClick} />
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Game
            </button>
            <button
              onClick={endMatch}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              End Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
