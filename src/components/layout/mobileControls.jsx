import React, { useState } from "react";
import { menuButtons } from "./controls";
import { motion } from "framer-motion";
import { parentFadeIn } from "../../utils/animations";
import { IconButton } from "@material-ui/core";
import { MenuButton } from "../sidebar";
import SideBarSaveOptions from "../loginFlow/sidebarSaveOptions";
import { Save } from "@material-ui/icons";

const MobileControls = () => {
  const [openID, setOpenID] = useState("");
  return (
    <>
      <motion.div
        variants={parentFadeIn}
        initial="initial"
        animate="animate"
        className="mobile-controls-cnt"
      >
        <div className="mobile-controls-content">
          <motion.div variants={parentFadeIn}>
            <MenuButton
              title={"Login"}
              content={<SideBarSaveOptions/>}
              icon={<Save />}
              openID={openID}
              setOpenID={setOpenID}
              maximumHeight={`50vh`}
              mobile={true}
            />
          </motion.div>

          {menuButtons.map(({ title, icon, content }) => (
            <motion.div variants={parentFadeIn}>
              <MenuButton
                title={title}
                content={content}
                icon={icon}
                openID={openID}
                setOpenID={setOpenID}
                maximumHeight={`50vh`}
                mobile={true}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default MobileControls;
