import React from "react";
import PersonalDetailsForm from "../forms/personalDetailsForm";
import { useCVData } from "../providers/CVDataProvider";

const PersonalDetails = ({ setPopUpContent, setPopUpOpen }) => {
  const personalDetails = useCVData().personalDetails;
  return (
    <>
      <div
        className="personal-details"
        onClick={() => {
          setPopUpContent(<PersonalDetailsForm setPopUpOpen={setPopUpOpen} />);
          setPopUpOpen(true);
        }}
      >
        <div className="image"></div>
        <div className="mt-2">
          {personalDetails.email || "youremail@gmail.com"}
        </div>
        <div className="mt-2"> {personalDetails.phone || "021 123 4567"}</div>
        <div className="mt-2">
          {personalDetails.address || "Manurewa, Auckland"}
        </div>
      </div>
      <div
        className="introduction section"
        onClick={() => {
          setPopUpContent(<PersonalDetailsForm setPopUpOpen={setPopUpOpen} />);
          setPopUpOpen(true);
        }}
      >
        <h3>About me</h3>
        <p>{personalDetails.intro}</p>
      </div>
    </>
  );
};

export default PersonalDetails;
