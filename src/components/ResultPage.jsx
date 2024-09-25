import React from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ResultPage = ({ team1Score, team2Score }) => {
    const navigate = useNavigate();
    const winner =
        team1Score > team2Score ? "Team 1 Wins!" : team1Score < team2Score ? "Team 2 Wins!" : "It's a Tie!";

    const handleResetGame = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
            <Confetti />
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-black p-8 max-w-lg mx-4">
                        <h1 className="text-5xl font-bold mb-4 text-green-800 text-center">{winner}</h1>
                        <div className="p-4 rounded-lg shadow-md mb-4">
                            <p className="text-3xl font-semibold mb-2">Final Scores</p>
                            <div className="flex justify-between text-xl font-medium">
                                <span>Team 1: Total Runs <span className="text-blue-700">{team1Score}</span></span>
                            </div>
                            <div className="flex justify-between text-xl font-medium mt-2">
                                <span>Team 2: Total Runs <span className="text-blue-700">{team2Score}</span></span>
                            </div>
                        </div>
                        <button
                            onClick={handleResetGame}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 w-full"
                        >
                            Reset Game
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultPage;
