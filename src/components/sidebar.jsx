import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import CreateIcon from "@material-ui/icons/Create";
import StyleIcon from "@material-ui/icons/Style";
import CVPDF from "./cv-pdf";
import Closer from "./closer";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeLayout, CurrentLayout } from "./providers/StyleProvider";
import { easy } from "../utils/animations";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useCVData } from "./providers/CVDataProvider";

const Sidebar = () => {
  const [openID, setOpenID] = useState("");
  return (
    <>
      <div
        className="cv-builder-columns"
        style={{ position: "fixed", width: "100%", pointerEvents: "none" }}
        layout
      >
        <div>
          <div className="sidebar-cnt">
            <div className="placeholder"></div>
            <div className="sidebar">
              {menuButtons.map(({ title, icon, content }) => (
                <MenuButton
                  title={title}
                  icon={icon}
                  content={content}
                  openID={openID}
                  setOpenID={setOpenID}
                />
              ))}
            </div>
            <PDFDownloadLink document={<CVPDF cvData={useCVData()} />}>
              <Button variant="contained" color="primary">
                Download
              </Button>
            </PDFDownloadLink>
            <div className="placeholder"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const MenuButton = ({ title, icon, content, openID, setOpenID }) => {
  const layout = CurrentLayout();
  const changeLayout = ChangeLayout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div key={title} className="menu-button" layout transition={easy}>
      <div className="button-top-bar">
        <Button
          fullWidth
          onClick={() => {
            setOpenID(title);
            setIsOpen(true);
            changeLayout({ ...layout, appLayout: "layout-large-left" });
          }}
        >
          <div className="menu-button-cnt">
            <div className="icon">{icon}</div>

            {title}
          </div>
        </Button>
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
          <div className="panel-content">
            {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StylePanel = () => {
  return ( <>
 <h3>Choose layout</h3>
  </> );
}


const menuButtons = [
  {
    title: "Style CV",
    content:
      <StylePanel/>,
    icon: <StyleIcon />,
  },
  {
    title: "Download CV",
    icon: <GetAppIcon />,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias doloremque asperiores debitis nisi inventore soluta? Animi saepe inventore alias officia amet odit iste molestiae quibusdam minima aliquid mollitia dolor dolorum porro neque laborum nisi exercitationem eius quasi ea ullam, architecto, fugit quae quam a! Nostrum, voluptatibus. Earum debitis optio error animi temporibus, ex officiis qui illo? Quibusdam illo numquam magni dolor molestias laboriosam quos nihil facere id, labore laudantium saepe nisi et eum minima ut. Assumenda aliquam reiciendis excepturi alias nisi, delectus nostrum veritatis necessitatibus quaerat atque! Nemo perferendis nulla molestiae assumenda reprehenderit. Quibusdam dolor nemo ipsam voluptates error?",
  },
  {
    title: "Apply for jobs",
    icon: <CreateIcon />,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias doloremque asperiores debitis nisi inventore soluta? Animi saepe inventore alias officia amet odit iste molestiae quibusdam minima aliquid mollitia dolor dolorum porro neque laborum nisi exercitationem eius quasi ea ullam, architecto, fugit quae quam a! Nostrum, voluptatibus. Earum debitis optio error animi temporibus, ex officiis qui illo? Quibusdam illo numquam magni dolor molestias laboriosam quos nihil facere id, labore laudantium saepe nisi et eum minima ut. Assumenda aliquam reiciendis excepturi alias nisi, delectus nostrum veritatis necessitatibus quaerat atque! Nemo perferendis nulla molestiae assumenda reprehenderit. Quibusdam dolor nemo ipsam voluptates error?",
  },
];

const parentHeightAnim = {
  initial: { height: 0 },
  animate: { height: 300, transition: { ...easy, delay: 0.1 } },
  exit: { height: 0, transition: { ...easy, duration: 0.55 } },
};

