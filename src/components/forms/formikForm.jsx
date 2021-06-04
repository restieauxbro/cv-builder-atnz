import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";

const SignupForm = ({ formFields }) => {
  // Pass the useFormik() hook initial form values and a submit function that will be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form className="add-new-item-cnt" onSubmit={formik.handleSubmit}>
        <div className="subtitle">Add new</div>
        <div className="two-column-grid">
          {formFields.map((formFieldItem) => (
            <TextField
              id={formFieldItem.fieldName}
              label={formFieldItem.fieldName}
              name={formFieldItem.fieldName}
              onChange={formik.handleChange}
              value={formik.values.fieldName}
            />
          ))}
        </div>
        <div className="buttons-cnt">
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
