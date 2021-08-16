import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import Sidebar from "../sidebar";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import CreateIcon from "@material-ui/icons/Create";
import { useBrand } from "../providers/StyleProvider";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVPDF from "../cv-pdf";
import { useCVData } from "../providers/CVDataProvider";
import { CallMade } from "@material-ui/icons";
import { supabase, useSession } from "../providers/AuthProvider";
import MobileControls from "./mobileControls";
import '../../styles/components/controls.scss'

const Controls = () => {
  const isDesktop = useMediaQuery(`(min-width: 800px)`);
  return <>{isDesktop ? <Sidebar /> : <MobileControls />}</>;
};

export default Controls;

const ApplyForJobs = () => {
  const [boxChecked, setBoxChecked] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);

  async function getCVPermission() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select("cvShared")
        .single();
      if (data) {
        !data.cvShared && setShowCheckbox(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function updateAccountDetails(e) {
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        updated_at: new Date(),
        cvShared: e.target.checked,
      };
      let { error } = await supabase
        .from("profiles")
        .upsert(updates, {
          returning: "minimal",
        })
        .then(console.log("changed cv permission in db"));
    } catch (error) {
      console.log("updateAccount problem,", error);
    }
  }

  const session = useSession();
  useEffect(() => {
    session && getCVPermission(); //only shows checkbox if they haven't shared their cv
  }, []);

  const brand = useBrand();

  return (
    <>
      <h3>
        {brand === "Competenz"
          ? "Competenz recruits apprentices"
          : "ATNZ hires apprentices"}
      </h3>
      <p>
        {brand === "Competenz"
          ? "We could get you hired into an apprenticeship if we have your CV on file. Apply for apprenticeships through our job board."
          : `We could hire you for an engineering apprenticeship if we have your CV
          on file, would you like to share it with us?`}
        <br />
      </p>
      {showCheckbox && (
        <FormControlLabel
          className="button-cnt"
          control={<Checkbox name="shareCVCheckbox" color="primary" />}
          label="Share CV with recruiters"
          checked={boxChecked}
          onChange={(e) => {
            updateAccountDetails(e);
            setBoxChecked(e.target.checked);
          }}
        />
      )}
      <br />
      <br />
      <a
        href={
          brand === "Competenz"
            ? `https://www.competenz.org.nz/jobseekers/finding-a-job/`
            : `https://atnz.org.nz/become-an-apprentice/jobs/`
        }
        target="_blank"
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<CallMade />}
          onChange={() => {
            async function changeBoxAndUpdata() {
              await setBoxChecked(!boxChecked).then(updateAccountDetails);
            }
          }}
        >
          See all jobs
        </Button>
      </a>
    </>
  );
};

const DownloadCVContent = () => {
  const personalDetails = useCVData().personalDetails;
  const fullname = `${personalDetails.firstName} ${personalDetails.lastName}`;
  const cvData = useCVData();

  return (
    <>
      <h3>Nice one</h3>
      <p>
        Your CV is ready to download. You can save it your computer or phone and
        attach it to a job application. Good luck! <br />
        <br />
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

export const menuButtons = [
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
    maximumHeight: 270,
  },
  {
    title: "Apply for jobs",
    icon: <CreateIcon />,
    content: <ApplyForJobs />,
    maximumHeight: 350,
  },
];
