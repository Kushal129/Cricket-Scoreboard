import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../src/index.css';
import '../../src/App.css';
import { motion } from "framer-motion";

const WelcomePage = ({ handleStartGame }) => {
    const [overs, setOvers] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOvers(e.target.value);
        setError("");
    };

    const handleStart = () => {
        const oversNumber = Number(overs);
        if (oversNumber <= 0 || oversNumber > 50 || !Number.isInteger(oversNumber)) {
            setError("Please enter a valid number of overs (1 to 50).");
        } else {
            handleStartGame(oversNumber);
            navigate("/Home");
        }
    };

    return (
        <motion.div 
            className="bg h-screen w-full bg-cover bg-center flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="flex flex-col items-center space-y-4 w-full max-w-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    Cricket Game
                </motion.h1>
                <div className="flex flex-col w-full space-y-2">
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        value={overs}
                        onChange={handleChange}
                        placeholder="Enter number of overs (1-50)"
                        className="border-2 border-[#0d1b38] bg-white bg-opacity-20 p-2 rounded-lg w-full text-white placeholder-gray-200 focus:outline-none focus:border-[#0d1b38]"
                        min="1"
                        max="50"
                    />
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="homebtn"
                        onClick={handleStart}
                        alt="Start Game"
                    >
                        <i>S</i>
                        <i>t</i>
                        <i>a</i>
                        <i>r</i>
                        <i>t</i>
                        <i> </i>
                        <i>G</i>
                        <i>a</i>
                        <i>m</i>
                        <i>e</i>
                    </motion.button>
                </div>
                {error && (
                    <motion.p 
                        className="text-red-200 text-sm font-semibold bg-[#0d1b38] px-3 py-1 rounded-full shadow-md"
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                            transition: {
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }
                        }}
                        exit={{ 
                            opacity: 0, 
                            scale: 0.8, 
                            y: 20,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            🏏 {error}
                        </motion.span>
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default WelcomePage;
