import React, { useEffect, useState } from "react";
import PersonalDetailsForm from "../forms/personalDetailsForm";
import { useCVData } from "../providers/CVDataProvider";
import { AnimatePresence } from "framer-motion";
import HelpBubble from "../helpBubble";

const NameTitle = ({ setPopUpContent, setPopUpOpen }) => {
  const personalDetails = useCVData().personalDetails;
  const [showHelpBubble, setShowHelpBubble] = useState(false);

  useEffect(() => {
    if (personalDetails.firstName === "") {
      setTimeout(function () {
        setShowHelpBubble(true);
      }, 1200);
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="huge-input"
        onClick={() => {
          setPopUpContent(<PersonalDetailsForm setPopUpOpen={setPopUpOpen} />);
          setPopUpOpen(true);
          setShowHelpBubble(false);
        }}
      >
        {personalDetails.firstName
          ? `${personalDetails.firstName} ${personalDetails.lastName}`
          : "Your name"}
      </div>
      <AnimatePresence>
        {showHelpBubble && (
          <HelpBubble setShow={setShowHelpBubble}>
            <h3>Let's get started 👀</h3>
            <p>
              Click any element on the CV to edit its content. Let's start with
              your personal information.
            </p>
          </HelpBubble>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NameTitle;
