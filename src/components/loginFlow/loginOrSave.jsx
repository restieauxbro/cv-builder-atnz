import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Closer from "../closer";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeLayout, CurrentLayout } from "../providers/StyleProvider";
import { easy } from "../../utils/animations";
import { AccountCircle, Save } from "@material-ui/icons";

const LoginOrSave = ({ title, openID, setOpenID }) => {
  const layout = CurrentLayout();
  const changeLayout = ChangeLayout();
  const [isOpen, setIsOpen] = useState(false);

  const parentHeightAnim = {
    initial: { height: 0 },
    animate: { height: 300, transition: { ...easy, delay: 0.1 } },
    exit: { height: 0, transition: { ...easy, duration: 0.55 } },
  };

  return (
    <motion.div
      key={title}
      className="login-or-save-bar"
      layout
      transition={easy}
    >
      <div className="button-top-bar">
        <div className="bar-options">
          <div className="profile head">
            <Button
              fullWidth
              onClick={() => {
                setOpenID(title);
                setIsOpen(true);
                changeLayout({ ...layout, appLayout: "layout-large-left" });
              }}
            >
              <div className="menu-button-cnt">
                <div className="icon">
                  <AccountCircle />
                </div>
                Profile
              </div>
            </Button>
          </div>
          <div className="save head">
            <Button
              fullWidth
              onClick={() => {
                setOpenID(title);
                setIsOpen(true);
                changeLayout({ ...layout, appLayout: "layout-large-left" });
              }}
            >
              <div className="menu-button-cnt">
                <div className="icon">
                  <Save />
                </div>
                Save
              </div>
            </Button>
          </div>
        </div>

        {openID === title && isOpen && (
          <Closer
            clickFunction={() => {
              setIsOpen(false);
              changeLayout({ ...layout, appLayout: "" });
            }}
          />
        )}
      </div>
      <AnimatePresence>
        {openID === title && isOpen && (
          <motion.div
            variants={parentHeightAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-cnt"
          >
            <div className="panel-content">hi</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginOrSave;
