import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Closer from "./closer";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeLayout, CurrentLayout } from "./providers/StyleProvider";
import { easy } from "../utils/animations";
import LoginOrSave from "./loginFlow/loginOrSave";
import { menuButtons } from "./layout/controls";

const Sidebar = () => {
  const [openID, setOpenID] = useState("");
  return (
    <>
      <div style={{ position: "fixed", width: "100%", pointerEvents: "none" }}>
        <div className="cv-builder-columns" layout>
          <div>
            <motion.div
              className="sidebar-cnt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LoginOrSave
                title="login-or-save"
                openID={openID}
                setOpenID={setOpenID}
              />

              <motion.div
                className="sidebar"
                variants={gridParent}
                initial="initial"
                animate="animate"
              >
                {menuButtons.map(({ title, icon, content, maximumHeight }) => (
                  <motion.div
                    variants={gridChild}
                    initial="initial"
                    animate="animate"
                    key={title}
                  >
                    <MenuButton
                      title={title}
                      icon={icon}
                      content={content}
                      openID={openID}
                      setOpenID={setOpenID}
                      maximumHeight={maximumHeight}
                    />
                  </motion.div>
                ))}
              </motion.div>
              {/* <PDFDownloadLink document={<CVPDF cvData={useCVData()} />}>
              <Button variant="contained" color="primary">
                Download
              </Button>
            </PDFDownloadLink> */}
              <div className="placeholder"></div>
              <div className="placeholder"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

export const MenuButton = ({
  title,
  maximumHeight,
  icon,
  content,
  openID,
  setOpenID,
  mobile,
}) => {
  const layout = CurrentLayout();
  const changeLayout = ChangeLayout();
  const [isOpen, setIsOpen] = useState(false);

  const parentHeightAnim = {
    initial: { height: 0 },
    animate: { height: maximumHeight, transition: { ...easy, delay: 0.1 } },
    exit: { height: 0, transition: { ...easy, duration: 0.55 } },
  };

  return (
    <motion.div key={title} className="menu-button" layout transition={easy}>
      <div className="button-top-bar">
        <Button
          fullWidth
          onClick={() => {
            setOpenID(title);
            setIsOpen(true);
            !mobile &&
              changeLayout({ ...layout, appLayout: "layout-large-left" });
          }}
        >
          <div className="menu-button-cnt">
            <div className="icon">{icon}</div>
            {!mobile && title}
          </div>
        </Button>
        {openID === title && isOpen && (
          <Closer
            clickFunction={() => {
              setIsOpen(false);
              !mobile && changeLayout({ ...layout, appLayout: "" });
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
            <div className="panel-content">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StylePanel = () => {
  const items = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <h3>Choose layout</h3>
      <motion.div
        variants={gridParent}
        initial="initial"
        animate="animate"
        className="grid"
      >
        {items.map((item) => (
          <motion.div
            variants={gridChild}
            key={item}
            className="style-thumb"
          ></motion.div>
        ))}
      </motion.div>
    </>
  );
};

const gridParent = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const gridChild = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: easy },
};
