import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { render } from "@testing-library/react";
import Closer from "./closer";

const ListHolder = ({
  title,
  fields,
  popUpOpen,
  setPopUpOpen,
  setPopUpContent,
}) => {
  const [listItems, setListItems] = useState([
    { School: "macleans", Description: "Here's one" },
    { School: "Pakurange", Description: "Here's another" },
  ]);

  function openForm() {
    setPopUpContent(
      <ListForm
        title={title}
        fields={fields}
        listItems={listItems}
        setListItems={setListItems}
        setPopUpOpen={setPopUpOpen}
        deleteItem={deleteItem}
      />
    );
    setPopUpOpen(true);
  }

  function deleteItem() {
    "";
  }
  return (
    <>
      <h3>{title}</h3>
      <ul>
        {listItems.map((obj) => {
          const keyValues = Object.values(obj);
          return (
            <li className="list-item">
              {keyValues.map((keyValue) => (
                <div>{keyValue}</div>
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

const ListForm = ({
  fields,
  title,
  listItems,
  setListItems,
  setPopUpOpen,
  deleteItem,
}) => {
  const [itemInWaiting, setItemInWaiting] = useState({});
  const [theseItems, setTheseItems] = useState(listItems); // duplicate for local state

  function handleSubmit() {
    setTheseItems([...theseItems, itemInWaiting]);
    setListItems([...theseItems, itemInWaiting]);
    console.log(theseItems);
  }
  useEffect(() => {
    setItemInWaiting({ id: uuidv4() });
  });
  return (
    <>
      <div className="items-form">
        <h3>{title}</h3>
        <ul className="editable-list-items">
          {theseItems.map((obj) => {
            const keyValues = Object.values(obj);
            return (
              <li key={uuidv4()} className="list-item">
                {keyValues.map((keyValue) => (
                  <div key={uuidv4()} className="prop">
                    {keyValue}
                  </div>
                ))}
                <Closer clickFunction={() => deleteItem()} />
              </li>
            );
          })}
        </ul>
        <div className="add-new-item-cnt">
          <div className="subtitle">Add new</div>
          <div className="two-column-grid">
            {fields.map((field) => (
              <TextField
                key={uuidv4()}
                label={field}
                onChange={(e) =>
                  setItemInWaiting({
                    ...itemInWaiting,
                    [field]: e.target.value,
                  })
                }
              />
            ))}
          </div>
          <div className="buttons-cnt">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="buttons-cnt">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setPopUpOpen(false)}
          >
            Save and exit
          </Button>
        </div>
      </div>
    </>
  );
};
