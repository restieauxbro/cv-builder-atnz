import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, supabase } from "./AuthProvider";

const CVData = createContext();
const UpdateCVData = createContext();

const CVDataProvider = ({ children }) => {
  const defaultCVData = {
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
  };
  const [CVObject, setCVObject] = useState(defaultCVData);

  async function addCVDataToDataBase() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`firstName, lastName`)
        .single();

      if (data) {
      }
      if (error && status !== 406) {
        const fullnameFromGoogle = supabase.auth.user().user_metadata.full_name;
        // If there's no db name data, add it from CV
        updateNameInDB(fullnameFromGoogle);
      }
    } catch (error) {
      // alert(error.message);lo
    }
  }

  async function updateNameInDB(fullnameFromGoogle) {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      fullName: fullnameFromGoogle || null,
      firstName: CVObject.personalDetails.firstName,
      lastName: CVObject.personalDetails.lastName,
    };
    try {
      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const session = useSession();
  useEffect(() => {
    // supabaseSession
    //   ? getProfile()
    //   : localStorageCV
    //   ? setCVObject(localStorageCV)
    //   :
    setCVObject(defaultCVData);
    session && addCVDataToDataBase();
  }, [session]);

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
