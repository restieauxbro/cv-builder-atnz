import React, { createContext, useContext, useState } from "react";

const CVData = createContext();
const UpdateCVData = createContext();

const CVDataProvider = ({ children }) => {
  const [CVObject, setCVObject] = useState({
    personalDetails: {
      firstName: "Tim",
      lastName: "Restieaux",
      intro:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, incidunt quod quam, placeat hic itaque voluptas harum consectetur aspernatur expedita debitis. Magnam, fugiat! Sint Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore possimus.",
      email: "restieauxbro@hotmail.com",
      address: "Auckland",
      phone: "02108419222",
    },
    jobs: [
      {
        id: "jobItem-1",
        jobtitle: "Engineer",
        company: "Fortnite engineering",
        date: "2 years",
        description:
          "I was buffing and helping NDT testers during the mill shut. This included confided space and working at heights work.",
      },
      {
        id: "jobItem-2",
        jobtitle: "Technician",
        company: "Caldwell's",
        date: "1 Month in January 2020",
        description:
          "I am currently working at ISS. Following drawings for welding and fabrication jobs both on site and in the workshop.",
      },
    ],
    education: [
      {
        id: 1,
        properties: {
          School: "Hello",
          Achievement: "Achievement 1",
        },
      },
      {
        id: 2,
        properties: {
          School: "Hello",
          Achievement: "Achievement 1",
        },
      },
    ],
  });

  const cvData = useContext(CVData);

  function updateCvFromUI(property, value) {
    setCVObject({ ...cvData, [property]: value });
  }

  return (
    <CVData.Provider value={CVObject}>
      <UpdateCVData.Provider value={setCVObject}>
      
          {children}
     
      </UpdateCVData.Provider>
    </CVData.Provider>
  );
};

export default CVDataProvider;

export function useCVData() {
  return useContext(CVData);
} // use this in any child to read the context

export function useCVDataUpdate() {
  return useContext(UpdateCVData);
} // use this in any child to update the context
