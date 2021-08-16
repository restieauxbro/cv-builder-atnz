import React from "react";
import { menuButtons } from "./controls";

const MobileControls = () => {
  return (
    <>
      <div className="mobile-controls-cnt">
        <div className="mobile-controls-content">
          {menuButtons.map(({ title, icon, content }) => (
              <div>{icon}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileControls;
