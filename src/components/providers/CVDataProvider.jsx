import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, supabase, upsertUserToProfiles } from "./AuthProvider";

const CVData = createContext();
const UpdateCVData = createContext();

const CVDataProvider = ({ children }) => {
  const defaultCVData = {
    personalDetails: {
      firstName: "",
      lastName: "",
      intro:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, incidunt quod quam, placeat hic itaque voluptas harum consectetur aspernatur expedita debitis. Magnam, fugiat! Sint Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore possimus.",
      email: "",
      address: "",
      phone: "",
    },
    jobs: [
      {
        id: "jobItem-1",
        jobtitle: "Engineer",
        company: "Fortnite engineering",
        date: "June 2019 - Present",
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
          School: "My high school",
          Achievement: "NCEA Level 2",
        },
      },
      {
        id: 2,
        properties: {
          School: "Institute name",
          Achievement: "My highest achievement",
        },
      },
    ],
  };
  const [CVObject, setCVObject] = useState(defaultCVData);

  async function addDataToDatabase() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`firstName, lastName, cvData`)
        .single();
      if (data) {
        // If there's no db name data, add it from CVData
        const fullnameFromGoogle = supabase.auth.user().user_metadata.full_name;
        data.firstName === null && updateNameInDB(fullnameFromGoogle);
      }
      if (error && status !== 406) {
        console.log('cvDataprovider error');
      }
    } catch (error) {
      console.log('cvDataprovider error');
    }
  }

  async function updateNameInDB(fullnameFromGoogle) {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      email: user.email,
      fullName: fullnameFromGoogle || null,
      firstName: CVObject.personalDetails.firstName,
      lastName: CVObject.personalDetails.lastName,
      updated_at: new Date(),
    };
    try {
      let { error } = await supabase
        .from("profiles")
        .insert(updates, { upsert: true, returning: "minimal" })
        .then(console.log("name added to db"));
    } catch (error) {
      console.log('cvDataprovider error');
    }
  }

  async function getCVFromDatabase() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`cvData`)
        .single();
      if (data) {
        data.cvData !== null
          ? setCVObject(data.cvData)
          : localStorage.getItem("cvDataLocal") !== null
          ? // else if session doesn't exist, and localstorage isn't null
            setCVObject(JSON.parse(localStorage.getItem("cvDataLocal")))
          : //set cvData to the one in local storage
            setCVObject(defaultCVData);
        // else use the default data (user isn't logged in AND has never set anything to localstorage)
      }
    } catch (error) {
      console.log('getCVFromDB error', error.message);
    }
  }

function decideWhichCVData(){
  session
  ? getCVFromDatabase()
  : // if the session exists try to get database cv
  localStorage.getItem("cvDataLocal") !== null
  ? // else if session doesn't exist, and localstorage isn't null
    setCVObject(JSON.parse(localStorage.getItem("cvDataLocal")))
  : //set cvData to the one in local storage
    setCVObject(defaultCVData);
// else use the default data (user isn't logged in AND has never set anything to localstorage)

}

  const session = useSession();
  useEffect(() => {
    session && upsertUserToProfiles() && // upserts user to database on every page load
     addDataToDatabase();   
     decideWhichCVData() 
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

export function changeAllCVs(obj, session, CVDataUpdate) {
  CVDataUpdate(obj);
  session
    ? sendCVToDatabase(obj)
    : localStorage.setItem("cvDataLocal", JSON.stringify(obj));
} // use this in any child to update the context

async function sendCVToDatabase(cvData) {
  try {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      updated_at: new Date(),
      cvData: cvData,
    };
    let { error } = await supabase
      .from("profiles")
      .upsert(updates, {
        returning: "minimal",
      })
      .then(console.log("uploade to db"));
    if (error) {
      console.log('sendCVToDB problem,', error)
    }
  } catch (error) {
    console.log('sendCVToDB problem,', error)
  }
}
