import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import CreateIcon from "@material-ui/icons/Create";
import StyleIcon from "@material-ui/icons/Style";
import Closer from "./closer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChangeLayout,
  CurrentLayout,
  useBrand,
} from "./providers/StyleProvider";
import { easy } from "../utils/animations";
import LoginOrSave from "./loginFlow/loginOrSave";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVPDF from "./cv-pdf";
import { useCVData } from "./providers/CVDataProvider";
import { CallMade } from "@material-ui/icons";
import { supabase, useSession } from "./providers/AuthProvider";

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

const MenuButton = ({
  title,
  maximumHeight,
  icon,
  content,
  openID,
  setOpenID,
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

const DownloadCVContent = () => {
  const personalDetails = useCVData().personalDetails;
  const fullname = `${personalDetails.firstName} ${personalDetails.lastName}`;
  const cvData = useCVData();

  return (
    <>
      <h3>Nice one</h3>
      <p>
        Your CV is ready to download. You can save it your computer or phone and
        attach it to a job application. Good luck! <br />
        <br />
      </p>

      <PDFDownloadLink
        document={<CVPDF cvData={cvData} />}
        fileName={`${fullname} CV.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <Button variant="contained" color="primary">
            {loading ? "Loading document..." : "Download now"}
          </Button>
        )}
      </PDFDownloadLink>
    </>
  );
};

const ApplyForJobs = () => {
  const [boxChecked, setBoxChecked] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);

  async function getCVPermission() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select("cvShared")
        .single();
      if (data) {
        !data.cvShared && setShowCheckbox(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function updateAccountDetails(e) {
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        updated_at: new Date(),
        cvShared: e.target.checked,
      };
      let { error } = await supabase
        .from("profiles")
        .upsert(updates, {
          returning: "minimal",
        })
        .then(console.log("changed cv permission in db"));
    } catch (error) {
      console.log("updateAccount problem,", error);
    }
  }

  const session = useSession();
  useEffect(() => {
    session && getCVPermission(); //only shows checkbox if they haven't shared their cv
  }, []);

  const brand = useBrand();

  return (
    <>
      <h3>
        {brand === "Competenz"
          ? "Competenz recruits apprentices"
          : "ATNZ hires apprentices"}
      </h3>
      <p>
        {brand === "Competenz"
          ? "We could get you hired into an apprenticeship if we have your CV on file. Apply for apprenticeships through our job board."
          : `We could hire you for an engineering apprenticeship if we have your CV
        on file, would you like to share it with us?`}
        <br />
      </p>
      {showCheckbox && (
        <FormControlLabel
          className="button-cnt"
          control={<Checkbox name="shareCVCheckbox" color="primary" />}
          label="Share CV with recruiters"
          checked={boxChecked}
          onChange={(e) => {
            updateAccountDetails(e);
            setBoxChecked(e.target.checked);
          }}
        />
      )}
      <br />
      <br />
      <a href="https://atnz.org.nz/become-an-apprentice/jobs/" target="_blank">
        <Button
          variant="contained"
          color="primary"
          endIcon={<CallMade />}
          onChange={() => {
            async function changeBoxAndUpdata() {
              await setBoxChecked(!boxChecked).then(updateAccountDetails);
            }
          }}
        >
          See all jobs
        </Button>
      </a>
    </>
  );
};

const menuButtons = [
  // {
  //   title: "Style CV",
  //   content: <StylePanel />,
  //   icon: <StyleIcon />,
  //   maximumHeight: 500,
  // },
  {
    title: "Download CV",
    icon: <GetAppIcon />,
    content: <DownloadCVContent />,
    maximumHeight: 270,
  },
  {
    title: "Apply for jobs",
    icon: <CreateIcon />,
    content: <ApplyForJobs />,
    maximumHeight: 350,
  },
];

const gridParent = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const gridChild = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: easy },
};
