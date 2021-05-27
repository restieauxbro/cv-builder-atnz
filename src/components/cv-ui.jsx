import React, { useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import {
  AddCircle,
  CancelPresentationTwoTone,
  CancelRounded,
} from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const CvUi = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});
  const [jobs, changeJobs] = useState([
    {
      id: "jobItem-1",
      jobtitle: "Engineer",
      company: "Fortnite engineering",
      startDate: 2,
      endDate: 3,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia rem ratione ex, animi nostrum consectetur impedit labore vel beatae ipsa?",
    },
    {
      id: "jobItem-2",
      jobtitle: "Technician",
      company: "Caldwell's",
      startDate: 2,
      endDate: 3,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia rem ratione ex, animi nostrum consectetur impedit labore vel beatae ipsa?",
    },
  ]);

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
  return (
    <>
      <div className="cv-builder-cnt">
        <div className="cv-builder">
          <div className="form-grid">
            <div className="personal-details">Region</div>
            <input class="huge-input" type="text" placeholder="Your name" />
            <TextField
              id="filled-textarea"
              label="A personal intro"
              placeholder="Tell us who you are. Why you do what you do"
              defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam fugit enim odio repudiandae earum assumenda aperiam laboriosam eos pariatur, beatae tenetur optio debitis quam incidunt ut blanditiis nihil doloribus."
              multiline
            />

            <div className="work-history">
              <h3 style={{ marginTop: 0 }}>Experience</h3>
              <div className="jobs-list">
                <div className="line" />
                {jobs.map(
                  ({
                    jobtitle,
                    startDate,
                    endDate,
                    description,
                    company,
                    id,
                  }) => (
                    <Job
                      jobtitle={jobtitle}
                      company={company}
                      id={id}
                      startDate={startDate}
                      endDate={endDate}
                      description={description}
                      editJob={editJob}
                    />
                  )
                )}
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
          <br />
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
  startDate,
  endDate,
  description,
  id,
  editJob,
}) => {
  const jobId = id;
  return (
    <div id={jobId} key={uuidv4()} onClick={() => editJob(jobId)}>
      <div className="job-cnt">
        <h4>{jobtitle}</h4>
        <p>{company}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

const JobForm = ({ jobs, changeJobs, setPopUpOpen, chosenJob }) => {
  const [jobInWaiting, changeJobInWaiting] = useState({
    ...chosenJob,
    id: uuidv4(),
  });

  return (
    <>
      <Closer onClick={() => setPopUpOpen(false)} />
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
      </div>

      <div>
        <TextField
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
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // if new job

            changeJobs([...jobs, jobInWaiting]);
            // end if new job
            setPopUpOpen(false);
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

const PopUp = ({ setPopUpOpen, popUpContent }) => {
  return (
    <>
      <motion.div
        className="pop-up-cnt"
        variants={parentFadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="pop-up-bg" onClick={() => setPopUpOpen(false)} />
        <motion.div variants={slideUp} className="pop-up">
          {popUpContent}
        </motion.div>
      </motion.div>
    </>
  );
};

const Closer = () => {
  return (
    <div className="cancel-button flex align-center">
      <div className="subtitle">Cancel</div>
      <IconButton aria-label="Cancel">
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
