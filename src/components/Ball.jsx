import React from "react";

const Ball = ({ value }) => {
    const getBallColor = (value) => {
        switch (value) {
            case 'wicket':
                return 'bg-red-600';
            case 'no':
                return 'bg-green-600';
            case 'wide':
                return 'bg-yellow-600';
            default:
                return 'bg-white';
        }
    };

    const getBallContent = (value) => {
        if (value === 'wicket') return 'W';
        if (value === 'no') return 'N';
        if (value === 'wide') return 'Wd';
        return value;
    };

    return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getBallColor(value)} text-gray-800 border-2 border-gray-300`}>
            {getBallContent(value)}
        </div>
    );
};

export default Ball;
