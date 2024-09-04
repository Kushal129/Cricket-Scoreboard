import React from "react";
import Ball from "./Ball";

const OverContainer = ({ balls }) => {
  return (
    <div className="flex justify-center mb-4">
      {balls.map((ball, index) => (
        <Ball key={index} value={ball} />
      ))}
    </div>
  );
};

export default OverContainer;
