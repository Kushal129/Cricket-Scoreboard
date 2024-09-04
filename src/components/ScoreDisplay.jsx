import React from "react";

const ScoreDisplay = ({ currentScore, totalScore, wickets, over, team }) => {
    return (
        <div className="text-center">
            <p className="text-2xl font-bold">
                Team {team} - Score: {totalScore} / {wickets}
            </p>
            <p className="text-lg">
                Current Over: {over} | Current Score in Over: {currentScore}
            </p>
        </div>
    );
};

export default ScoreDisplay;
