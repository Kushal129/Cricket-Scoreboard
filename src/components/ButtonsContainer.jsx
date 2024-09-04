import React from "react";
import { motion } from "framer-motion";
import { CiBaseball } from "react-icons/ci";

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
                    className="bg-white text-black font-semibold p-2 rounded-full hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => handleClick(button.value)}
                    whileHover="hover"
                    variants={buttonVariants}
                >
                    <CiBaseball className="text-xl" />
                    {button.label}
                </motion.button>
            ))}
        </div>
    );
};

export default ButtonsContainer;
