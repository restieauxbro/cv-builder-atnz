import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle } from "@material-ui/icons";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckIcon from "@material-ui/icons/Check";
import HelpBubble from "../helpBubble";
import TurnOnHelp from "../TurnOnHelp";
import { changeAllCVs, useCVData, useCVDataUpdate } from "../providers/CVDataProvider";
import { useSession } from "../providers/AuthProvider";

const JobForm = ({ setPopUpOpen, setPopUpContent, chosenJob, isNew }) => {
  const jobs = useCVData().jobs;
  const CVData = useCVData();
  const CVDataUpdate = useCVDataUpdate();
  const session = useSession()
  function changeJobs(sumthn) {
    changeAllCVs({ ...CVData, jobs: sumthn }, session, CVDataUpdate);
  }

  const [jobInWaiting, changeJobInWaiting] = useState({
    ...chosenJob,
    id: uuidv4(),
  });

  const [addAnotherJob, setAddAnotherJob] = useState(false);

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

  function submitJob(values) {
    // map through jobs and replace the job with matching id
    const jobsWithEdited = jobs.map((job) => {
      if (job.id === chosenJobID) {
        job = { id: uuidv4(), ...values };
      }
      return job;
    });
    isNew === true
      ? changeJobs([...jobs, { id: uuidv4(), ...values }])
      : changeJobs(jobsWithEdited);
  }

  function openNewJobForm() {

    setPopUpContent(
      <JobForm
        setPopUpOpen={setPopUpOpen}
        setPopUpContent={setPopUpContent}
        chosenJob={{ title: "", company: "" }}
        isNew={true}
      />
    );
  }

  const formik = useFormik({
    initialValues: {
      company: chosenJob.company,
      jobtitle: chosenJob.jobtitle,
      date: chosenJob.date,
      description: chosenJob.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitJob(values);
      setPopUpContent("");
      !addAnotherJob && setPopUpOpen(false)
      setTimeout(() => {
        addAnotherJob && openNewJobForm();
      }, 0);
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
        <div
          className="flex space-between align-center"
          style={{ marginTop: "2rem", minHeight: 50 }}
        >
          <TurnOnHelp />
          <div className="buttons-cnt">
            <Button
              style={{ marginRight: "1rem" }}
              variant="outlined"
              color="primary"
              startIcon={<CheckIcon />}
              type="submit"
              onClick={() => setAddAnotherJob(false)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddCircle />}
              type="submit"
              onClick={() => setAddAnotherJob(true)}
            >
              Add more
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default JobForm;
