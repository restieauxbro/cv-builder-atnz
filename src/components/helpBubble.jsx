import React from "react";
import { motion } from "framer-motion";
import Closer from "./closer";

const HelpBubble = ({ children, suggestions }) => {
  return (
    <motion.div
      variants={parentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="help-bubble"
    >
      {children}
      {suggestions && (
        <div className="flex" style={{marginTop: "1rem"}}>
          {suggestions.map((suggestion) => (
            <div key={suggestion} className="suggestion">
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* <Closer clickFunction={() => setShow(false)} opacity={0.6} /> */}
    </motion.div>
  );
};

export default HelpBubble;

const parentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
