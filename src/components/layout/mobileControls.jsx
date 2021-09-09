import React, { useState } from "react";
import { menuButtons } from "./controls";
import { motion } from "framer-motion";
import { parentFadeIn } from "../../utils/animations";
import { MenuButton } from "../sidebar";
import SideBarSaveOptions from "../loginFlow/sidebarSaveOptions";
import { AccountCircle, Save } from "@material-ui/icons";
import { useSession } from "../providers/AuthProvider";
import Account from "../loginFlow/Account";

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
            <LoginOrSaveMobile openID={openID} setOpenID={setOpenID} />
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

const LoginOrSaveMobile = ({ openID, setOpenID }) => {
  const session = useSession();
  return (
    <>
      {session ? (
        <MenuButton
          title={"Profile"}
          content={<Account />}
          icon={<AccountCircle />}
          openID={openID}
          setOpenID={setOpenID}
          maximumHeight={`50vh`}
          mobile={true}
        />
      ) : (
        <MenuButton
          title={"Login"}
          content={
            <>
              <h3>Login to save</h3>
              <SideBarSaveOptions />
            </>
          }
          icon={<Save />}
          openID={openID}
          setOpenID={setOpenID}
          maximumHeight={`50vh`}
          mobile={true}
        />
      )}
    </>
  );
};
