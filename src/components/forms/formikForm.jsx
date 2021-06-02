import React, { useState } from "react";

import { useFormik } from "formik";

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will

  // be called when the form is submitted
  const [items, setItems] = useState([
    {
      email: "hello@what.com",
    },
    {
      email: "hello@what.com",
    },
  ]);

  const formFields = [
    {
      fieldName: "email",
      fieldType: "email",
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setItems([...items, values])
    },
  });

  return (
    <>
    {items.map(({email}) => (
      <div>{email}</div>
      
    ))}
    <br />
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      {formFields.map((formFieldItem) => (
        <input
          id={formFieldItem.fieldName}
          name={formFieldItem.fieldName}
          type={formFieldItem.fieldType}
          onChange={formik.handleChange}
          value={formik.values.fieldName}
        />
      ))}

      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default SignupForm;
