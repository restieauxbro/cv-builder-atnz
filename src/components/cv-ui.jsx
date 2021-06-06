import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckIcon from "@material-ui/icons/Check";
import ListHolder from "./list-holder";
import Closer from "./closer";
import SchoolsValidationForm from "./forms/schoolsValidationForm";
import HelpBubble from "./helpBubble";
import PersonalDetailsForm from "./forms/personalDetailsForm";

const CvUi = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});

  const [CVData, setCVData] = useState({
    personalDetails: {
      name: "",
      intro:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, incidunt quod quam, placeat hic itaque voluptas harum consectetur aspernatur expedita debitis. Magnam, fugiat! Sint",
      email: "restieauxbro@hotmail.com",
      address: "Auckland",
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

  const jobs = CVData.jobs;
  const education = CVData.education;
  const personalDetails = CVData.personalDetails;

  function changeJobs(sumthn) {
    setCVData({ ...CVData, jobs: sumthn });
  }
  function setEducation(sumthn) {
    setCVData({ ...CVData, education: sumthn });
  }
  function setPersonalDetails(sumthn) {
    setCVData({ ...CVData, personalDetails: sumthn });
  }

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
              <div
                className="personal-details"
                onClick={() => {
                  setPopUpContent(
                    <PersonalDetailsForm
                      personalDetails={personalDetails}
                      setPersonalDetails={setPersonalDetails}
                      setPopUpOpen={setPopUpOpen}
                    />
                  );
                  setPopUpOpen(true);
                }}
              >
                <div className="image"></div>
                {personalDetails.email}
                <div>021 084 19222</div>
                {personalDetails.address}
              </div>
              <div className="introduction section">
                <h3>Intro</h3>
                <p>
                  {personalDetails.intro}
                </p>
              </div>
              <div className="education section">
                <ListHolder
                  title="Education"
                  listItems={education}
                  setListItems={setEducation}
                  setPopUpOpen={setPopUpOpen}
                  setPopUpContent={setPopUpContent}
                  popUpOpen={popUpOpen}
                  form={<SchoolsValidationForm />}
                  defaultItems={education}
                />
              </div>
              <div className="skills section"></div>
            </div>
            <div className="column-2">
              <input
                className="huge-input"
                type="text"
                placeholder="Your name"
                defaultValue={personalDetails.name}
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

  const validationSchema = yup.object({
    company: yup
      .string("Who did you work for or help out?")
      .required("Who did you work for or help out?"),
    jobtitle: yup
      .string("What was the name of your job?")
      .required("What was the name of your job?"),
    date: yup
      .string("How long was this experience")
      .required("How long was this experience"),
    description: yup
      .string("Tell us about what your tasks were.")
      .min(60, "Can you tell us more?")
      .required("Tell us about what your tasks were."),
  });

  const formik = useFormik({
    initialValues: {
      company: chosenJob.company,
      jobtitle: chosenJob.jobtitle,
      date: chosenJob.date,
      description: chosenJob.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // map through jobs and replace the job with matching id
      const jobsWithEdited = jobs.map((job) => {
        if (job.id === chosenJobID) {
          job = { id: uuidv4(), ...values };
        }
        return job;
      });
      isNew
        ? changeJobs([...jobs, { id: uuidv4(), ...values }])
        : changeJobs(jobsWithEdited);
      setPopUpOpen(false);
    },
  });

  const [showHelpBubble, setShowHelpBubble] = useState(false);
  const [dateHelp, showDateHelp] = useState(false);

  return (
    <>
      <h3>{isNew ? "New experience" : `Edit ${jobInWaiting.company}`}</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="two-column-grid">
          <TextField
            id="company"
            name="company"
            label="Company"
            value={formik.values.company}
            onChange={formik.handleChange}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
          <TextField
            id="jobtitle"
            name="jobtitle"
            label="Job title"
            value={formik.values.jobtitle}
            onChange={formik.handleChange}
            error={formik.touched.jobtitle && Boolean(formik.errors.jobtitle)}
            helperText={formik.touched.jobtitle && formik.errors.jobtitle}
          />
        </div>
        <div>
          <div className="help-bubble-focus">
            <TextField
              style={{ width: "100%", marginTop: "2rem" }}
              multiline
              id="date"
              name="date"
              label="When and for how long?"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              onFocus={() => showDateHelp(true)}
              onBlur={() => showDateHelp(false)}
            />
            <AnimatePresence>
              {dateHelp && (
                <HelpBubble
                  setShow={setShowHelpBubble}
                  suggestions={[
                    "January - March 2021",
                    "Every Sunday at church",
                  ]}
                >
                  <h3>When? How long?</h3>
                  <p>
                    Show the employer that you can stick to something. Say
                    something like:
                  </p>
                </HelpBubble>
              )}
            </AnimatePresence>
          </div>
          <div className="help-bubble-focus">
            <TextField
              style={{ width: "100%", marginTop: "2rem" }}
              multiline
              id="description"
              name="description"
              label="What did you do there?"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              onFocus={() => setShowHelpBubble(true)}
              onBlur={() => setShowHelpBubble(false)}
            />
            <AnimatePresence>
              {showHelpBubble && (
                <HelpBubble
                  setShow={setShowHelpBubble}
                  suggestions={["Welded frames", "Organised time..."]}
                >
                  <h3>What did you do? 💪</h3>
                  <p>
                    Tell us what your tasks were, or what you managed to
                    accomplish, or anything really! The point is just to show
                    you learned something.
                  </p>
                </HelpBubble>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="buttons-cnt">
          <Button
            style={{ marginRight: "1rem" }}
            variant="outlined"
            color="primary"
            startIcon={<CheckIcon />}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircle />}
            type="submit"
          >
            Add more
          </Button>
        </div>
      </form>
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
