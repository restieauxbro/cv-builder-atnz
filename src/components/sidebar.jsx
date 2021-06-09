import React, { useState } from "react";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import CreateIcon from "@material-ui/icons/Create";
import StyleIcon from "@material-ui/icons/Style";
import Closer from "./closer";
import { AnimatePresence, motion } from "framer-motion";

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
            {menuButtons.map(({ title, icon, content }) => (
              <MenuButton title={title} icon={icon} content={content} />
            ))}
          </div>
          <div className="placeholder"></div>
          <div className="placeholder"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const MenuButton = ({ title, icon, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div key={title} className="menu-button">
      <Button fullWidth onClick={() => setOpen(!open)}>
        <div className="menu-button-cnt">
          <div className="icon">{icon}</div>

          {title}
        </div>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={parentHeightAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-cnt"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const menuButtons = [
  {
    title: "Style CV",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias doloremque asperiores debitis nisi inventore soluta? Animi saepe inventore alias officia amet odit iste molestiae quibusdam minima aliquid mollitia dolor dolorum porro neque laborum nisi exercitationem eius quasi ea ullam, architecto, fugit quae quam a! Nostrum, voluptatibus. Earum debitis optio error animi temporibus, ex officiis qui illo? Quibusdam illo numquam magni dolor molestias laboriosam quos nihil facere id, labore laudantium saepe nisi et eum minima ut. Assumenda aliquam reiciendis excepturi alias nisi, delectus nostrum veritatis necessitatibus quaerat atque! Nemo perferendis nulla molestiae assumenda reprehenderit. Quibusdam dolor nemo ipsam voluptates error?",
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
  animate: { height: "auto", transition: { delay: 0.1 } },
  exit: { height: 0 },
};
