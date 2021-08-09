import { Button, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Closer from "./closer";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  changeAllCVs,
  useCVData,
  useCVDataUpdate,
} from "./providers/CVDataProvider";
import TurnOnHelp from "./TurnOnHelp";
import { useSession } from "./providers/AuthProvider";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { motion, AnimateSharedLayout } from "framer-motion";

const ListHolder = ({ title, setPopUpOpen, setPopUpContent }) => {
  const listItems = useCVData().education;

  function openForm() {
    setPopUpContent(
      <ListForm
        title={title}
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
      <div className="cv-ui-button">
        <Button variant="contained" color="primary" onClick={() => openForm()}>
          Add more
        </Button>
      </div>
    </>
  );
};

export default ListHolder;

const ListForm = ({ title, listItems, setPopUpOpen }) => {
  const CVData = useCVData();
  const CVDataUpdate = useCVDataUpdate();
  const session = useSession();
  function setListItems(sumthn) {
    changeAllCVs({ ...CVData, education: sumthn }, session, CVDataUpdate);
  }

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
      formik.resetForm();
    },
  });

  const remapItems = (arr, init, target) => {
    [arr[init], arr[target]] = [arr[target], arr[init]];
    setListItems(arr);
    console.log("remapped");
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

const DraggableListItems = ({ editableListItems, deleteItem, remapItems }) => {
  return (
    <AnimateSharedLayout>
      <ul className="editable-list-items">
        {editableListItems.map((editable, index) => {
          const keyValues = Object.values(editable.properties);
          return (
            <motion.li  layoutId={editable} key={uuidv4()} className="list-item">
              {keyValues.map((keyValue) => (
                <div key={uuidv4()} className="prop">
                  {keyValue}
                </div>
              ))}
              <div className="controls">
                {index !== 0 && (
                  <IconButton
                    onClick={() =>
                      remapItems(editableListItems, index, index - 1)
                    }
                  >
                    <ExpandLess />
                  </IconButton>
                )}
                {editableListItems[editableListItems.length - 1].id !==
                  editable.id && ( // Only show if it's not the last item in the array
                  <IconButton
                    onClick={() =>
                      remapItems(editableListItems, index, index + 1)
                    }
                  >
                    <ExpandMore />
                  </IconButton>
                )}
                <Closer clickFunction={() => deleteItem(editable.id)} />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </AnimateSharedLayout>
  );
};
