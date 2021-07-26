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

const LoginOrSave = ({ title, openID, setOpenID }) => {
  const layout = CurrentLayout();
  const changeLayout = ChangeLayout();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const parentHeightAnim = {
    initial: { height: 0 },
    animate: { height: 300, transition: { ...easy, delay: 0.1 } },
    exit: { height: 0, transition: { ...easy, duration: 0.55 } },
  };

  const personalDetails = useCVData().personalDetails

  // Move all these calls and db updates into the CV data provider
  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`firstName, lastName`)
        .single();

      if (data) {
        console.log(data);
        const fullnameFromGoogle = supabase.auth.user().user_metadata.full_name
        data.firstName ? setName(`${data.firstName}`) : updateNameInDB(fullnameFromGoogle);
      }
    } catch (error) {
      // alert(error.message);lo
    }
  }

  async function updateNameInDB(fullnameFromGoogle) {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      fullName: fullnameFromGoogle,
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
    };
    try {
      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    session && getProfile();
  });

  const session = useSession();

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
                {session && name ? `${name}` : "Profile"}
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
            <div className="panel-content">
              {session ? <LogoutButton /> : <SideBarSaveOptions />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginOrSave;

const LogoutButton = () => {
  async function logout() {
    let { error } = await supabase.auth.signOut();
  }
  return (
    <Button variant="contained" disableElevation onClick={() => logout()}>
      Log out
    </Button>
  );
};
