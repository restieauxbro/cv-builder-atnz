import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckIcon from "@material-ui/icons/Check";
import HelpBubble from "../helpBubble";
import { useCVData, useCVDataUpdate } from "../providers/CVDataProvider";
import TurnOnHelp from "../TurnOnHelp";

const PersonalDetailsForm = ({ setPopUpOpen }) => {
  const CVData = useCVData();

  const personalDetails = useCVData().personalDetails;

  const CVDataUpdate = useCVDataUpdate();

  function setPersonalDetails(sumthn) {
    CVDataUpdate({ ...CVData, personalDetails: sumthn });
  }

  const validationSchema = yup.object({
    name: yup
      .string("What's your name?")
      .required("What's your name?"),
    intro: yup
      .string("Who are you?")
      .min(60, "Can you tell us more?")
      .required("Who are you?"),
    email: yup
      .string("What's your email?")
      .email("That doesn't look like an email")
      .required("What's your email?"),
    address: yup
      .string("Where abouts do you live?")
      .required("Where abouts do you live?"),
  });

  const formik = useFormik({
    initialValues: {
      name: personalDetails.name,
      email: personalDetails.email,
      address: personalDetails.address,
      intro: personalDetails.intro,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setPersonalDetails(values);
      setPopUpOpen(false);
    },
  });

  const [showHelpBubble, setShowHelpBubble] = useState(false);
  const [addresshelp, showaddresshelp] = useState(false);

  return (
    <>
      <h3>Personal details</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="two-column-grid">
          <TextField
            id="name"
            name="name"
            label="Your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <div className="help-bubble-focus">
            <TextField
              style={{ width: "100%", marginTop: "2rem" }}
              multiline
              id="address"
              name="address"
              label="Region and suburb"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              onFocus={() => showaddresshelp(true)}
              onBlur={() => showaddresshelp(false)}
            />
            <AnimatePresence>
              {addresshelp && (
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
              id="intro"
              name="intro"
              label="Personal introduction"
              value={formik.values.intro}
              onChange={formik.handleChange}
              error={formik.touched.intro && Boolean(formik.errors.intro)}
              helperText={formik.touched.intro && formik.errors.intro}
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
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalDetailsForm;
