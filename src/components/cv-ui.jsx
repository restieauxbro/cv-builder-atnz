import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListHolder from "./list-holder";
import Closer from "./closer";
import SchoolsValidationForm from "./forms/schoolsValidationForm";
import PersonalDetails from "./cv-ui/PersonalDetails";
import NameTitle from "./cv-ui/NameTitle";
import ExperienceSection from "./cv-ui/ExperienceSection";
import { CurrentLayout } from "./providers/StyleProvider";
import { easy } from "../utils/animations";

const CvUi = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});

  const layoutName = CurrentLayout().appLayout;

  return (
    <>
      <div className="cv-builder-cnt">
        <div className="cv-builder-content">
          <motion.div
            layoutId="cv-page"
            className="cv-builder"
            animate={
              layoutName === "layout-large-left"
                ? {
                    x: 100,
                    y: -150,
                    scale: 0.7,
                    transition: { ...easy, duration: 0.6 },
                  }
                : {}
            }
            transition={{ ...easy, duration: 1 }}
          >
            <motion.div
              className="form-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="column-1">
                <PersonalDetails
                  setPopUpContent={setPopUpContent}
                  setPopUpOpen={setPopUpOpen}
                />
                <div className="education section">
                  <ListHolder
                    title="Education"
                    setPopUpOpen={setPopUpOpen}
                    setPopUpContent={setPopUpContent}
                    popUpOpen={popUpOpen}
                    form={<SchoolsValidationForm />}
                  />
                </div>
                <div className="skills section"></div>
              </div>
              <div className="column-2">
                <NameTitle
                  setPopUpOpen={setPopUpOpen}
                  setPopUpContent={setPopUpContent}
                />

                <ExperienceSection
                  setPopUpOpen={setPopUpOpen}
                  setPopUpContent={setPopUpContent}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {popUpOpen && (
          <PopUp setPopUpOpen={setPopUpOpen} popUpContent={popUpContent} />
        )}
      </AnimatePresence>
    </>
  );
};

export default CvUi;

const PopUp = ({ setPopUpOpen, popUpContent, exitText }) => {
  return (
    <>
      <motion.div
        className="pop-up-cnt cv-builder-columns"
        variants={parentFadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="pop-up-bg" onClick={() => setPopUpOpen(false)} />
        <div></div>
        <div className="flex justify-center align-center">
          <motion.div variants={slideUp} className="pop-up">
            <Closer clickFunction={() => setPopUpOpen(false)} text={exitText} />
            {popUpContent}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const parentFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15, delayChildren: 0.2 } },
  exit: { opacity: 0 },
};

const slideUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};
