import React from "react";

const ScoreDisplay = ({ currentScore, totalScore, wickets, over, team, workingBalls }) => {
    return (
        <div className="text-center">
            <p className="text-2xl font-bold">
                Team {team} - Score: {totalScore} / {wickets}
            </p>
            <p className="text-lg">
                Current Over: {over} | Current Score in Over: {currentScore}
            </p>
            <p className="text-xl">Working Balls: {workingBalls}</p>
        </div>
    );
};

export default ScoreDisplay;
