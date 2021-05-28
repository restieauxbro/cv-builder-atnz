import React, { useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle, CancelRounded } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import CheckIcon from "@material-ui/icons/Check";

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
  const [personalDetails, setPersonalDetails] = useState({});

  function editJob(jobId) {
    const chosenJob = jobs.find((jobs) => jobs.id === jobId);
    const jobsWithDeleted = jobs.filter((jobs) => jobs.id !== jobId);
    setPopUpContent(
      <JobForm
        chosenJob={chosenJob}
        jobs={jobsWithDeleted}
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
              <div className="personal-details">Region</div>
              <div className="introduction section">
                <h3>Intro</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
                  incidunt quod quam, placeat hic itaque voluptas harum
                  consectetur aspernatur expedita debitis. Magnam, fugiat! Sint
                </p>
              </div>
            </div>
            <div className="column-2">
              <input class="huge-input" type="text" placeholder="Your name" />

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

  return (
    <>
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
          style={{ width: "100%" }}
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
          onClick={() => {
            changeJobs([...jobs, jobInWaiting]);
            setPopUpOpen(false);
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddCircle />}
          onClick={() => {
            changeJobs([...jobs, jobInWaiting]);
            setPopUpOpen(false);
          }}
        >
          Add more
        </Button>
      </div>
    </>
  );
};

const PopUp = ({ setPopUpOpen, popUpContent }) => {
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
            <Closer clickFunction={() => setPopUpOpen(false)} text="cancel" />
            {popUpContent}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const Closer = ({ text, clickFunction }) => {
  return (
    <div
      className="cancel-button flex align-center"
      onClick={() => clickFunction()}
    >
      <div className="subtitle">{text}</div>
      <IconButton aria-label={text}>
        <CancelRounded />
      </IconButton>
    </div>
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
