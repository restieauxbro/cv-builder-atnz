import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  changeAllCVs,
  useCVData,
  useCVDataUpdate,
} from "../providers/CVDataProvider";
import TurnOnHelp from "../TurnOnHelp";
import { useSession } from "../providers/AuthProvider";
import DraggableListItems from "./draggableList";

const Skills = ({ title, setPopUpOpen, setPopUpContent }) => {
  const listItems = useCVData().skills;

  function openForm() {
    setPopUpContent(
      <ListForm
        title='Skills and attributes'
        listItems={listItems}
        setPopUpOpen={setPopUpOpen}
      />
    );
    setPopUpOpen(true);
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {listItems && listItems.map((listItem) => {
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
      <div className="cv-ui-button">
        <Button variant="contained" color="primary" onClick={() => openForm()}>
          Add more
        </Button>
      </div>
    </>
  );
};

export default Skills;

const ListForm = ({ title, listItems, setPopUpOpen }) => {
  const CVData = useCVData();
  const CVDataUpdate = useCVDataUpdate();
  const session = useSession();
  function setListItems(sumthn) {
    changeAllCVs({ ...CVData, skills: sumthn }, session, CVDataUpdate);
  }

  const [editableListItems, setEditableListItems] = useState(listItems || []);

  function deleteItem(itemId) {
    const itemsWithDeleted = editableListItems.filter(
      (item) => item.id !== itemId
    );
    setEditableListItems(itemsWithDeleted);
  }
  const validationSchema = yup.object({
    Skill: yup
      .string("What school or education centre?")
      .required("What school or education centre?"),
    Description: yup
      .string("What was your level of achievement?")
      .required("What was your level of achievement?"),
  });

  const formik = useFormik({
    initialValues: {
      Skill: "",
      Description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      setEditableListItems([
        ...editableListItems,
        { id: uuidv4(), properties: values },
      ]);
      formik.resetForm();
    },
  });

  const remapItems = (arr, init, target) => {
    [arr[init], arr[target]] = [arr[target], arr[init]];
    setListItems(arr);
  };

  return (
    <>
      <h3>{title}</h3>
      <div className="items-form">
        <DraggableListItems
          editableListItems={editableListItems}
          deleteItem={deleteItem}
          remapItems={remapItems}
        />
        <div className="add-new-item-cnt">
          <div className="subtitle">Add new</div>

          <form onSubmit={formik.handleSubmit}>
            <div className="two-column-grid">
              <TextField
                fullWidth
                id="Skill"
                name="Skill"
                label="Skill or attribute"
                value={formik.values.Skill}
                onChange={formik.handleChange}
                error={formik.touched.Skill && Boolean(formik.errors.Skill)}
                helperText={formik.touched.Skill && formik.errors.Skill}
              />
              <TextField
                fullWidth
                id="Description"
                name="Description"
                label="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                error={
                  formik.touched.Description &&
                  Boolean(formik.errors.Description)
                }
                helperText={
                  formik.touched.Description && formik.errors.Description
                }
              />
            </div>
            <div className="buttons-cnt" style={{ marginTop: "1rem" }}>
              <Button color="primary" variant="contained" type="submit">
                Add
              </Button>
            </div>
          </form>
        </div>
        <div
          className="flex space-between align-center"
          style={{ marginTop: "1rem", minHeight: 50 }}
        >
          <TurnOnHelp />
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
      </div>
    </>
  );
};


