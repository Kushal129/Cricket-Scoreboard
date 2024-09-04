import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import OverContainer from "./OverContainer";
import ButtonsContainer from "./ButtonsContainer";
import ScoreDisplay from "./ScoreDisplay";
import ResultPage from "./ResultPage";

const Home = () => {
    const navigate = useNavigate();
    const [startGame, setStartGame] = useState(false);
    const [totalOvers, setTotalOvers] = useState(0);
    const [currentOver, setCurrentOver] = useState(1);
    const [balls, setBalls] = useState([]);
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [isTeam1Batting, setIsTeam1Batting] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);

    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem("cricketGameState"));
        if (savedState) {
            setStartGame(true);
            setTotalOvers(savedState.totalOvers);
            setCurrentOver(savedState.currentOver);
            setBalls(savedState.balls);
            setTeam1Score(savedState.team1Score);
            setTeam2Score(savedState.team2Score);
            setCurrentScore(savedState.currentScore);
            setWickets(savedState.wickets);
            setIsTeam1Batting(savedState.isTeam1Batting);
            setGameOver(savedState.gameOver);
            setShowCompletionMessage(savedState.showCompletionMessage);
        } else {
            navigate("/"); // Redirect to WelcomePage if no game state
        }
    }, [navigate]);

    useEffect(() => {
        const gameState = {
            totalOvers,
            currentOver,
            balls,
            team1Score,
            team2Score,
            currentScore,
            wickets,
            isTeam1Batting,
            gameOver,
            showCompletionMessage
        };
        localStorage.setItem("cricketGameState", JSON.stringify(gameState));
    }, [totalOvers, currentOver, balls, team1Score, team2Score, currentScore, wickets, isTeam1Batting, gameOver, showCompletionMessage]);

    const handleClick = (type) => {
        if (wickets < 10 && balls.length < 6) {
            const newBalls = [...balls, type];
            setBalls(newBalls);

            if (type !== "dot" && type !== "wicket" && type !== "wide" && type !== "no") {
                const runs = parseInt(type);
                setCurrentScore(currentScore + runs);
                if (isTeam1Batting) {
                    setTeam1Score(team1Score + runs);
                } else {
                    setTeam2Score(team2Score + runs);
                }
            }

            if (type === "wicket") {
                setWickets(wickets + 1);
            }

            if (newBalls.length === 6 || wickets === 10) {
                if (currentOver === totalOvers) {
                    if (isTeam1Batting) {
                        setShowCompletionMessage(true);
                        setIsTeam1Batting(false);
                        setCurrentOver(1);
                        setBalls([]);
                        setWickets(0);
                        setCurrentScore(0);
                    } else {
                        setGameOver(true);
                    }
                } else {
                    setCurrentOver(currentOver + 1);
                    setBalls([]);
                }
            }
        }
    };

    const handleStartGame = (overs) => {
        if (window.confirm(`Start the match with ${overs} overs per team?`)) {
            setTotalOvers(overs);
            setStartGame(true);
        }
    };

    const handleResetGame = () => {
        if (window.confirm("Are you sure you want to reset the game? All progress will be lost.")) {
            localStorage.removeItem("cricketGameState");
            setStartGame(false);
            setTotalOvers(0);
            setCurrentOver(1);
            setBalls([]);
            setTeam1Score(0);
            setTeam2Score(0);
            setCurrentScore(0);
            setWickets(0);
            setIsTeam1Batting(true);
            setGameOver(false);
            setShowCompletionMessage(false);
            navigate("/"); // Redirect to WelcomePage after reset
        }
    };

    if (!startGame) {
        return <WelcomePage handleStartGame={handleStartGame} />;
    }

    if (gameOver) {
        return <ResultPage team1Score={team1Score} team2Score={team2Score} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-200 p-5">
            <div className="flex flex-col md:flex-row bg-white border border-brown-700 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                <div className="flex-1 bg-green-600 p-6 text-white flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        {isTeam1Batting ? "Team 1" : "Team 2"} Batting
                    </h1>
                    <OverContainer balls={balls} />
                    <ScoreDisplay
                        currentScore={currentScore}
                        totalScore={isTeam1Batting ? team1Score : team2Score}
                        wickets={wickets}
                        over={currentOver}
                        team={isTeam1Batting ? 1 : 2}
                    />
                </div>
                <div className="flex-1 bg-gray-800 p-6 text-white flex flex-col items-center">
                    <ButtonsContainer handleClick={handleClick} />
                    <button
                        onClick={handleResetGame}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 mt-4"
                    >
                        Reset Game
                    </button>
                </div>
            </div>

            {showCompletionMessage && (
                <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white p-4 text-center">
                    <h2 className="text-xl font-bold">Team 1 Innings Completed!</h2>
                    <p className="mt-2">Total Score: {team1Score}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
