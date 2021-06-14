import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListHolder from "./list-holder";
import Closer from "./closer";
import SchoolsValidationForm from "./forms/schoolsValidationForm";
import PersonalDetails from "./cv-ui/PersonalDetails";
import NameTitle from "./cv-ui/NameTitle";
import ExperienceSection from "./cv-ui/ExperienceSection";

const CvUi = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});

  return (
    <>
      <div className="cv-builder-cnt">
      <div className="cv-builder-content">
    
        <div className="cv-builder">
          <div className="form-grid">
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

              <ExperienceSection setPopUpOpen={setPopUpOpen}
                setPopUpContent={setPopUpContent} />
            </div>
            
          </div>
        </div>
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
