import React from "react";
import JobForm from "../cv-ui/JobForm";
import {
  changeAllCVs,
  useCVData,
  useCVDataUpdate,
} from "../providers/CVDataProvider";
import { Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle, ExpandLess, ExpandMore } from "@material-ui/icons";
import Closer from "../closer";
import { IconButton } from "@material-ui/core";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useSession } from "../providers/AuthProvider";
import { CurrentLayout } from "../providers/StyleProvider";

const ExperienceSection = ({ setPopUpOpen, setPopUpContent }) => {
  const jobs = useCVData().jobs;
  const CVData = useCVData();
  const CVDataUpdate = useCVDataUpdate();
  function editJob(jobId) {
    const chosenJob = jobs.find((jobs) => jobs.id === jobId);
    setPopUpContent(
      <JobForm
        chosenJob={chosenJob}
        setPopUpOpen={setPopUpOpen}
        setPopUpContent={setPopUpContent}
      />
    );
    setPopUpOpen(true);
  }
  function deleteJob(jobId) {
    const jobsWithDeleted = jobs.filter((jobs) => jobs.id !== jobId);
    changeJobs(jobsWithDeleted);
  }
  function changeJobs(sumthn) {
    CVDataUpdate({ ...CVData, jobs: sumthn });
  }
  return (
    <AnimateSharedLayout>
      <div className="work-history section">
        <h3 style={{ marginTop: 0 }}>Experience</h3>
        <div className="jobs-list">
          <div className="line" />
          {jobs.map(({ jobtitle, date, description, company, id }, index) => (
            <Job
              key={uuidv4()}
              jobtitle={jobtitle}
              company={company}
              index={index}
              id={id}
              date={date}
              description={description}
              editJob={editJob}
              deleteJob={deleteJob}
            />
          ))}
        </div>
        <div className="cv-ui-button">
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircle />}
            onClick={() => {
              setPopUpOpen(true);
              setPopUpContent(
                <JobForm
                  setPopUpOpen={setPopUpOpen}
                  setPopUpContent={setPopUpContent}
                  chosenJob={{ title: "" }}
                  isNew={true}
                />
              );
            }}
          >
            Add experience
          </Button>
        </div>
      </div>
    </AnimateSharedLayout>
  );
};

export default ExperienceSection;

const Job = ({
  jobtitle,
  company,
  date,
  description,
  id,
  index,
  editJob,
  deleteJob,
}) => {
  const jobId = id;

  const CVDataUpdate = useCVDataUpdate();
  const CVData = useCVData();
  const allJobs = CVData.jobs;
  const session = useSession();

  const remapJobs = (arr, init, target) => {
    [arr[init], arr[target]] = [arr[target], arr[init]];
    changeAllCVs({ ...CVData, jobs: arr }, session, CVDataUpdate);
  };

  const layoutName = CurrentLayout().appLayout;
  const largeLayout = layoutName === "layout-large-left";

  return (
    <motion.div layoutId={!largeLayout ? jobId : ""} id={jobId} key={jobId}>
      <div className="job-cnt">
        <div className="controls">
          {index !== 0 && (
            <IconButton onClick={() => remapJobs(allJobs, index, index - 1)}>
              <ExpandLess />
            </IconButton>
          )}
          {allJobs[allJobs.length - 1].id !== jobId && (
            <IconButton onClick={() => remapJobs(allJobs, index, index + 1)}>
              <ExpandMore />
            </IconButton>
          )}

          <Closer clickFunction={() => deleteJob(jobId)} />
        </div>
        <div className="content" onClick={() => editJob(jobId)}>
          <h4>
            <span className="dark-text"> {jobtitle}</span> <br />
            <span className="light-text">{company}</span>
          </h4>
          <p>{date}</p>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};
