import React from "react";
import { motion } from "framer-motion";

const LoaderPage = () => {
  return (
    <>
      <div className="loader-cnt">
        <motion.div layoutId="cv-page" className="loader"
        animate={{transition: {duration: 3}}}>
          <div className="loader-circle"></div>
        </motion.div>
      </div>
    </>
  );
};

export default LoaderPage;
