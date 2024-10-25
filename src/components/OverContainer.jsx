import React from "react";
import Ball from "./Ball";

const OverContainer = ({ balls }) => {
  return (
    <div className="bg-black rounded-lg p-4 shadow-lg">
      <div className="bg-green-800 rounded-lg p-3">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2">
            {balls && balls.length > 0 ? (
              balls.map((ball, index) => (
                <div key={index} className="relative">
                  <Ball value={ball} />
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white">NO data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverContainer;
