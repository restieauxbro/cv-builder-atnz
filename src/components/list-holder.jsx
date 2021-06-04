import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Closer from "./closer";
import { useFormik } from "formik";
import * as yup from "yup";

const ListHolder = ({ title, setPopUpOpen, setPopUpContent, defaultItems }) => {
  const [listItems, setListItems] = useState(defaultItems);

  function openForm() {
    setPopUpContent(
      <ListForm
        title={title}
        listItems={listItems}
        setListItems={setListItems}
        setPopUpOpen={setPopUpOpen}
      />
    );
    setPopUpOpen(true);
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {listItems.map((listItem) => {
          const keyValues = Object.values(listItem.properties);
          return (
            <li key={uuidv4()} className="list-item">
              {keyValues.map((keyValue) => (
                <div key={uuidv4()}>{keyValue}</div>
              ))}
            </li>
          );
        })}
      </ul>
      <Button variant="contained" color="primary" onClick={() => openForm()}>
        Add more
      </Button>
    </>
  );
};

export default ListHolder;

const ListForm = ({ title, listItems, setListItems, setPopUpOpen }) => {
  const [editableListItems, setEditableListItems] = useState(listItems);

  function deleteItem(itemId) {
    const itemsWithDeleted = editableListItems.filter(
      (item) => item.id !== itemId
    );
    setEditableListItems(itemsWithDeleted);
  }
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
      //alert(JSON.stringify(values, null, 2));
      setEditableListItems([
        ...editableListItems,
        { id: uuidv4(), properties: values },
      ]);
      console.log(editableListItems);
      formik.resetForm();
    },
  });

  return (
    <>
      <h3>{title}</h3>
      <div className="items-form">
        <ul className="editable-list-items">
          {editableListItems.map((editable) => {
            const keyValues = Object.values(editable.properties);
            return (
              <li key={uuidv4()} className="list-item">
                {keyValues.map((keyValue) => (
                  <div key={uuidv4()} className="prop">
                    {keyValue}
                  </div>
                ))}
                <Closer clickFunction={() => deleteItem(editable.id)} />
              </li>
            );
          })}
        </ul>
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
                  formik.touched.Achievement &&
                  Boolean(formik.errors.Achievement)
                }
                helperText={
                  formik.touched.Achievement && formik.errors.Achievement
                }
              />
            </div>
            <div className="buttons-cnt">
              <Button color="primary" variant="contained" type="submit">
                Add
              </Button>
            </div>
          </form>
        </div>
        <div className="buttons-cnt">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setListItems(editableListItems);
              setPopUpOpen(false);
            }}
          >
            Save and exit
          </Button>
        </div>
      </div>
    </>
  );
};
