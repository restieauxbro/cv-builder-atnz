import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import CreateIcon from "@material-ui/icons/Create";
import StyleIcon from "@material-ui/icons/Style";
import Closer from "./closer";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeLayout, CurrentLayout } from "./providers/StyleProvider";
import { easy } from "../utils/animations";
import LoginOrSave from "./loginFlow/loginOrSave";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVPDF from "./cv-pdf";
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
            <LoginOrSave
              title="login-or-save"
              openID={openID}
              setOpenID={setOpenID}
            />

            <div className="sidebar">
              {menuButtons.map(({ title, icon, content, maximumHeight }) => (
                <MenuButton
                  key={title}
                  title={title}
                  icon={icon}
                  content={content}
                  openID={openID}
                  setOpenID={setOpenID}
                  maximumHeight={maximumHeight}
                />
              ))}
            </div>
            {/* <PDFDownloadLink document={<CVPDF cvData={useCVData()} />}>
              <Button variant="contained" color="primary">
                Download
              </Button>
            </PDFDownloadLink> */}
            <div className="placeholder"></div>
            <div className="placeholder"></div>
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
  const [loadDoc, setLoadDoc] = useState(false);
  function loadOnOpen() {
    setTimeout(function () {
      setLoadDoc(true);
    }, 4000);
  }

  useEffect(() => {
    loadOnOpen();
  });
  return (
    <>
      <h3>Nice one!</h3>
      <p>
        Your CV is ready to download <br /><br />
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
    maximumHeight: 250,
  },
  {
    title: "Apply for jobs",
    icon: <CreateIcon />,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias doloremque asperiores debitis nisi ",
    maximumHeight: 100,
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
