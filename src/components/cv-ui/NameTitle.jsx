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
      {personalDetails.firstName ? `${personalDetails.firstName} ${personalDetails.lastName}` : "Your name"}
    </div>
  );
};

export default NameTitle;
