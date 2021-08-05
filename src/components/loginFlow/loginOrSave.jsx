import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Closer from "../closer";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeLayout, CurrentLayout } from "../providers/StyleProvider";
import { easy } from "../../utils/animations";
import { AccountCircle, Save } from "@material-ui/icons";
import SideBarSaveOptions from "./sidebarSaveOptions";
import { useSession, supabase } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useCVData } from "../providers/CVDataProvider";
import Account from "./Account";

const LoginOrSave = ({ title, openID, setOpenID }) => {
  const layout = CurrentLayout();
  const changeLayout = ChangeLayout();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Profile");

  const parentHeightAnim = {
    initial: { height: 0 },
    animate: { height: 345, transition: { ...easy, delay: 0.1 } },
    exit: { height: 0, transition: { ...easy, duration: 0.55 } },
  };

  const session = useSession();
  const CVFirstName = useCVData().personalDetails.firstName;

  async function getNameFromDB() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`firstName, lastName`)
        .single();
      if (data) {
        setName(data.firstName);
      } else setName(CVFirstName);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    session && getNameFromDB();
  });

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
                {session && name ? name : "Profile"}
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
          <div className="save head">
            <Button
              fullWidth
              onClick={() => {
                if (!session) {
                  setOpenID(title);
                  setIsOpen(true);
                  changeLayout({ ...layout, appLayout: "layout-large-left" });
                }
              }}
            >
              <div className="menu-button-cnt">
                <div className="icon">
                  <Save />
                </div>
                {session ? "Saved" : "Save"}
              </div>
            </Button>
          </div>
        </div>
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
              {session ? (
                <Account />
              ) : (
                <>
                  <h3>Login to save</h3>
                  <SideBarSaveOptions />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginOrSave;
