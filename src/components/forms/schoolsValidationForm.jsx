import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const SchoolsValidationForm = ({ listItems, setListItems }) => {
  const validationSchema = yup.object({
    School: yup
      .string("What school or education centre?")
      .required("What school or education centre?"),
    Achievement: yup
      .string("What was your level of achievement?")
      .required("What was your level of achievement?"),
  });

  const formik = useFormik({
    initialValues: {
      School: "",
      Achievement: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setListItems([...listItems, values]);
    },
  });

  return (
    <div className="add-new-item-cnt">
      <div className="subtitle">Add new</div>

      <form onSubmit={formik.handleSubmit}>
        <div className="two-column-grid">
          <TextField
            fullWidth
            id="School"
            name="School"
            label="School"
            value={formik.values.School}
            onChange={formik.handleChange}
            error={formik.touched.School && Boolean(formik.errors.School)}
            helperText={formik.touched.School && formik.errors.School}
          />
          <TextField
            fullWidth
            id="Achievement"
            name="Achievement"
            label="Achievement"
            type="Achievement"
            value={formik.values.Achievement}
            onChange={formik.handleChange}
            error={
              formik.touched.Achievement && Boolean(formik.errors.Achievement)
            }
            helperText={formik.touched.Achievement && formik.errors.Achievement}
          />
        </div>
        <div className="buttons-cnt">
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SchoolsValidationForm;
