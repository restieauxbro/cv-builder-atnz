import { Button, ButtonBase } from "@material-ui/core";
import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import Closer from "./closer";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <>
      <div
        className="cv-builder-columns"
        style={{ position: "fixed", width: "100%", pointerEvents: "none" }}
      >
        <div className="sidebar-cnt">
          <div className="placeholder"></div>
          <div className="sidebar">
            <motion.div
              className="help-bubble"
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 1, delay: 3, type: "spring", stiffness: 100 }}
            >
              <div style={{ opacity: 0.6 }}>
                <Closer clickFunction={() => ""} />
              </div>

              <h3>Hello there! 👋</h3>
              <p>
                This is where a helper bubble will appear. Whatever you're
                typing, this bad boy will be here to give suggestions and tips.
              </p>
            </motion.div>
          </div>
          <div className="placeholder"></div>
          <div className="download buttons-cnt">
            <Button
              startIcon={<GetAppIcon />}
              variant="contained"
              color="primary"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
