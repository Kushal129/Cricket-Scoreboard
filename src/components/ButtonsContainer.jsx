import React from "react";
import { motion } from "framer-motion";
import { LiaBaseballBallSolid } from "react-icons/lia";

const buttonVariants = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3,
        },
    },
};

const ButtonsContainer = ({ handleClick }) => {
    const buttonTypes = [
        { label: "1 Run", value: "1" },
        { label: "2 Runs", value: "2" },
        { label: "3 Runs", value: "3" },
        { label: "4 Runs", value: "4" },
        { label: "6 Runs", value: "6" },
        { label: "Dot Ball", value: "dot" },
        { label: "Wicket", value: "wicket" },
        { label: "Wide Ball", value: "wide" },
        { label: "No Ball", value: "no" },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-5">
            {buttonTypes.map((button) => (
                <motion.button
                    key={button.value}
                    className="relative w-20 h-20 rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center"
                    onClick={() => handleClick(button.value)}
                    variants={buttonVariants}
                    alt={button.label}
                >
                    <span className="absolute text-center font-bold text-gray-700 z-10">
                        {button.label}
                    </span>
                    <LiaBaseballBallSolid className="text-3xl opacity-10 text-black" />
                </motion.button>
            ))}
        </div>
    );
};

export default ButtonsContainer;
