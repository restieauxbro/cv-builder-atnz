import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { AddCircle } from "@material-ui/icons";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckIcon from "@material-ui/icons/Check";
import HelpBubble from "../helpBubble";

const PersonalDetailsForm = ({
  personalDetails,
  setPersonalDetails,
  setPopUpOpen,
}) => {
  const validationSchema = yup.object({
    name: yup
      .string("Who did you work for or help out?")
      .required("Who did you work for or help out?"),
    intro: yup
      .string("What was the name of your job?")
      .min(60, "Can you tell us more?")
      .required("What was the name of your job?"),
    email: yup
      .string("How long was this experience")
      .required("How long was this experience"),
    address: yup
      .string("Tell us about what your tasks were.")
      .required("Tell us about what your tasks were."),
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
              label="When and for how long?"
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

export default PersonalDetailsForm;
