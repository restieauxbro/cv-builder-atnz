import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import CheckIcon from "@material-ui/icons/Check";
import ListHolder from "./list-holder";
import Closer from "./closer";
import SchoolsValidationForm from "./forms/schoolsValidationForm";

const CvUi = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});
  const [jobs, changeJobs] = useState([
    {
      id: "jobItem-1",
      jobtitle: "Engineer",
      company: "Fortnite engineering",
      date: "",
      description:
        "I was buffing and helping NDT testers during the mill shut. This included confided space and working at heights work.",
    },
    {
      id: "jobItem-2",
      jobtitle: "Technician",
      company: "Caldwell's",
      date: "",
      description:
        "I am currently working at ISS. Following drawings for welding and fabrication jobs both on site and in the workshop.",
    },
  ]);

  function editJob(jobId) {
    const chosenJob = jobs.find((jobs) => jobs.id === jobId);
    setPopUpContent(
      <JobForm
        jobs={jobs}
        chosenJob={chosenJob}
        changeJobs={changeJobs}
        setPopUpOpen={setPopUpOpen}
      />
    );
    setPopUpOpen(true);
  }
  function deleteJob(jobId) {
    const jobsWithDeleted = jobs.filter((jobs) => jobs.id !== jobId);
    changeJobs(jobsWithDeleted);
  }
  return (
    <>
      <div className="cv-builder-cnt">
        <div className="cv-builder">
          <div className="form-grid">
            <div className="column-1">
              <div className="personal-details">
                <div className="image"></div>
                restieauxbro@hotmail.com
                <div>021 084 19222</div>
                <div>Auckland</div>
              </div>
              <div className="introduction section">
                <h3>Intro</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
                  incidunt quod quam, placeat hic itaque voluptas harum
                  consectetur aspernatur expedita debitis. Magnam, fugiat! Sint
                </p>
              </div>
              <div className="education section">
                <ListHolder
                title="Education"
                  setPopUpOpen={setPopUpOpen}
                  setPopUpContent={setPopUpContent}
                  popUpOpen={popUpOpen}
                  form={<SchoolsValidationForm />}
                  defaultItems={[
                    {id: 1, properties: { School: "Hello", Achievement: "Achievement 1" }},
                    {id: 2, properties: { School: "Hello", Achievement: "Achievement 1" }},
                    
                  ]}
                />
              </div>
              <div className="skills section"></div>
            </div>
            <div className="column-2">
              <input
                className="huge-input"
                type="text"
                placeholder="Your name"
              />

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
                        jobs={jobs}
                        changeJobs={changeJobs}
                        setPopUpOpen={setPopUpOpen}
                        chosenJob={{ title: "" }}
                        isNew={true}
                      />
                    );
                  }}
                >
                  Add another job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {popUpOpen && (
          <PopUp setPopUpOpen={setPopUpOpen} popUpContent={popUpContent} />
        )}
      </AnimatePresence>
    </>
  );
};

export default CvUi;

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

const JobForm = ({ jobs, changeJobs, setPopUpOpen, chosenJob, isNew }) => {
  const [jobInWaiting, changeJobInWaiting] = useState({
    ...chosenJob,
    id: uuidv4(),
  });

  const chosenJobID = chosenJob.id;

  function handleSubmit() {
    // map through jobs and replace the job with matching id
    const jobsWithEdited = jobs.map((job) => {
      if (job.id === chosenJobID) {
        job = jobInWaiting;
      }
      return job;
    });
    isNew ? changeJobs([...jobs, jobInWaiting]) : changeJobs(jobsWithEdited);
    setPopUpOpen(false);
  }

  return (
    <>
      <h3>{isNew ? "New experience" : `Edit ${jobInWaiting.company}`}</h3>
      <div className="two-column-grid">
        <TextField
          label="Company"
          onChange={(e) => {
            changeJobInWaiting({ ...jobInWaiting, company: e.target.value });
          }}
          defaultValue={jobInWaiting.company}
        />
        <TextField
          label="Job title"
          onChange={(e) => {
            changeJobInWaiting({ ...jobInWaiting, jobtitle: e.target.value });
          }}
          defaultValue={jobInWaiting.jobtitle}
        />
        <TextField
          label="When and for how long?"
          onChange={(e) => {
            changeJobInWaiting({ ...jobInWaiting, date: e.target.value });
          }}
          defaultValue={jobInWaiting.jobtitle}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%", marginTop: "2rem" }}
          multiline
          label="What did you do there?"
          onChange={(e) => {
            changeJobInWaiting({
              ...jobInWaiting,
              description: e.target.value,
            });
          }}
          defaultValue={jobInWaiting.description}
        />
      </div>
      <div className="buttons-cnt">
        <Button
          style={{ marginRight: "1rem" }}
          variant="outlined"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddCircle />}
          onClick={() => handleSubmit()}
        >
          Add more
        </Button>
      </div>
    </>
  );
};

const PopUp = ({ setPopUpOpen, popUpContent, exitText }) => {
  return (
    <>
      <motion.div
        className="pop-up-cnt cv-builder-columns"
        variants={parentFadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="pop-up-bg" onClick={() => setPopUpOpen(false)} />
        <div></div>
        <div className="flex justify-center align-center">
          <motion.div variants={slideUp} className="pop-up">
            <Closer clickFunction={() => setPopUpOpen(false)} text={exitText} />
            {popUpContent}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const parentFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15, delayChildren: 0.2 } },
  exit: { opacity: 0 },
};

const slideUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};
