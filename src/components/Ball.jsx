import React from "react";

const Ball = ({ value }) => {
    return (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black text-lg font-bold bg-red mx-1">
            {value}
        </div>
    );
};

export default Ball;
