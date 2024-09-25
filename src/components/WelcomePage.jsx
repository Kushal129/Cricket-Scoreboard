import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../src/index.css';
import '../../src/App.css';



const WelcomePage = ({ handleStartGame }) => {
    const [overs, setOvers] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOvers(e.target.value);
    };

    const handleStart = () => {
        if (overs <= 0 || overs > 50) {
            toast.error("Please enter a valid number of overs (1 to 50).");
        } else {
            handleStartGame(Number(overs));
            navigate("/Home");
        }
    };

    return (
        <div className="bg bg-cover">
            <div className="flex flex-col items-center justify-center min-h-screen p-5 backdrop-blur-sm">
                <div className="bg-transparent p-8 max-w-lg w-full flex flex-col items-center space-y-6">
                    <h1 className="text-3xl font-bold text-center text-white mb-4">Welcome to Cricket Game</h1>
                    <input
                        type="number"
                        value={overs}
                        onChange={handleChange}
                        placeholder="Enter number of overs"
                        className="border border-gray-300 p-2 rounded-lg w-full max-w-xs"
                        min="1"
                        max="50"
                    />
                    {/* <button
                        onClick={handleStart}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Start Game
                    </button> */}
                    <button alt="GET START" onClick={handleStart}>
                        <i>G</i>
                        <i>E</i>
                        <i>T</i>
                        <i>&nbsp;</i>
                        <i>S</i>
                        <i>T</i>
                        <i>A</i>
                        <i>R</i>
                        <i>T</i>
                        <i></i>
                    </button>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div >
        </div >
    );
};

export default WelcomePage;
