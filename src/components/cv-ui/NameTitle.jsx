import React from "react";
import PersonalDetailsForm from "../forms/personalDetailsForm";
import { useCVData } from "../providers/CVDataProvider";

const NameTitle = ({setPopUpContent, setPopUpOpen}) => {
    const personalDetails = useCVData().personalDetails;
  return (
    <div
      className="huge-input"
      onClick={() => {
        setPopUpContent(<PersonalDetailsForm setPopUpOpen={setPopUpOpen} />);
        setPopUpOpen(true);
      }}
    >
      {personalDetails.name ? personalDetails.name : "Your name"}
    </div>
  );
};

export default NameTitle;
