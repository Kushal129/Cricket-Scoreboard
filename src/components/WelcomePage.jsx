import { div } from "framer-motion/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../src/index.css';

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
        <div className="bg-wel-bg bg-cover">
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


                    <button className="btn" onClick={handleStart}>
                        <div>GET STARTED</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M11.6801 14.62L14.2401 12.06L11.6801 9.5" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M4 12.0601H14.17" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
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
