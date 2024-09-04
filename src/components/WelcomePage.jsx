import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const WelcomePage = ({ handleStartGame }) => {
    const [overs, setOvers] = useState(0);
    const navigate = useNavigate(); // Use navigate to programmatically redirect

    const handleChange = (e) => {
        setOvers(e.target.value);
    };

    const handleStart = () => {
        if (overs <= 0 || overs > 50) {
            toast.error("Please enter a valid number of overs (1 to 50).");
        } else {
            handleStartGame(Number(overs));
            navigate('/Home'); // Redirect to Home page after starting the game
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-5">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full flex flex-col items-center space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Cricket Game</h1>
                <input
                    type="number"
                    value={overs}
                    onChange={handleChange}
                    placeholder="Enter number of overs"
                    className="border border-gray-300 p-2 rounded-lg w-full max-w-xs"
                    min="1"
                    max="50"
                />
                <button
                    onClick={handleStart}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Start Game
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WelcomePage;
