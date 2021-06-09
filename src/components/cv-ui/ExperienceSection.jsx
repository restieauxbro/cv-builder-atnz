import React from "react";
import JobForm from "../cv-ui/JobForm";
import { useCVData, useCVDataUpdate } from "../providers/CVDataProvider";
import { Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle } from "@material-ui/icons";
import Closer from "../closer";

const ExperienceSection = ({ setPopUpOpen, setPopUpContent }) => {
  const jobs = useCVData().jobs;
  const CVData = useCVData();
  const CVDataUpdate = useCVDataUpdate();
  function editJob(jobId) {
    const chosenJob = jobs.find((jobs) => jobs.id === jobId);
    setPopUpContent(
      <JobForm chosenJob={chosenJob} setPopUpOpen={setPopUpOpen} />
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
    <div className="work-history section">
      <h3 style={{ marginTop: 0 }}>Experience</h3>
      <div className="jobs-list">
        <div className="line" />
        {jobs.map(({ jobtitle, date, description, company, id }) => (
          <Job
            key={uuidv4()}
            jobtitle={jobtitle}
            company={company}
            id={id}
            date={date}
            description={description}
            editJob={editJob}
            deleteJob={deleteJob}
          />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddCircle />}
        onClick={() => {
          setPopUpOpen(true);
          setPopUpContent(
            <JobForm
              setPopUpOpen={setPopUpOpen}
              chosenJob={{ title: "" }}
              isNew={true}
            />
          );
        }}
      >
        Add experience
      </Button>
    </div>
  );
};

export default ExperienceSection;

const Job = ({
  jobtitle,
  company,
  date,
  description,
  id,
  editJob,
  deleteJob,
}) => {
  const jobId = id;
  return (
    <div id={jobId} key={uuidv4()}>
      <div className="job-cnt">
        <div className="content" onClick={() => editJob(jobId)}>
          <h4>
            <span className="dark-text"> {jobtitle}</span> <br />
            <span className="light-text">{company}</span>
          </h4>
          <p>{date}</p>
          <p>{description}</p>
        </div>
        <div className="controls">
          <Closer clickFunction={() => deleteJob(jobId)} text="Delete" />
        </div>
      </div>
    </div>
  );
};
