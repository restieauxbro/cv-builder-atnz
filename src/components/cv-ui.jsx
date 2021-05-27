import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle } from "@material-ui/icons";
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
  return (
    <>
      <div className="cv-builder-cnt">
        <div className="cv-builder">
          <div className="form-grid">
            <input class="huge-input" type="text" placeholder="Your name" />
            <div className="personal-details">Region</div>
            <TextField
              id="filled-textarea"
              label="A personal intro"
              placeholder="Tell us who you are. Why you do what you do"
              multiline
            />
            <div />
            <div className="work-history">
              <h3>Experience</h3>
              <div className="jobs-list"><div className="line"/>
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

const Job = ({ jobtitle, company, startDate, endDate, description, id }) => {
  return (
    <div key={uuidv4()}>
      <div className="job-cnt">
        <h4>{jobtitle}</h4>
        <p>{company}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

const JobForm = ({ jobs, changeJobs, setPopUpOpen }) => {
  const [jobInWaiting, changeJobInWaiting] = useState({});
  return (
    <>
      <div className="two-column-grid">
        <TextField
          label="Company"
          onChange={(e) => {
            changeJobInWaiting({ ...jobInWaiting, company: e.target.value });
          }}
        />
        <TextField
          label="Job title"
          onChange={(e) => {
            changeJobInWaiting({ ...jobInWaiting, jobtitle: e.target.value });
          }}
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
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            changeJobs([...jobs, jobInWaiting]);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0 }}
      >
        <div className="pop-up-bg" onClick={() => setPopUpOpen(false)} />
        <div className="pop-up">{popUpContent}</div>
      </motion.div>
    </>
  );
};
