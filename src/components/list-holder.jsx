import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Closer from "./closer";

const ListHolder = ({
  title,
  fields,
  setPopUpOpen,
  setPopUpContent,
  defaultItems,
}) => {
  const [listItems, setListItems] = useState(defaultItems);

  const [listItemInWaiting, setIt] = useState({});

  function handleSubmit() {
    setListItems([...listItems, listItemInWaiting]);
  }

  function openForm() {
    setPopUpContent(
      <ListForm
        title={title}
        fields={fields}
        listItems={listItems}
        setListItems={setListItems}
        setPopUpOpen={setPopUpOpen}
        deleteItem={deleteItem}
        listItemInWaiting={listItemInWaiting}
        setIt={setIt}
        handleSubmit={handleSubmit}
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
      {listItemInWaiting.School}
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
  listItemInWaiting,
  setIt,
  handleSubmit,
}) => {
  const [theseItems, setTheseItems] = useState([...listItems]); // duplicate for local state
  const [popUpItemInWaiting, setPopUpItemInWaiting] = useState({});
  return (
    <>
      <div className="items-form">
        {listItemInWaiting.School}
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
              <DynamicTextInput
                key={uuidv4()}
                field={field}
                listItemInWaiting={listItemInWaiting}
                setIt={setIt}
                popItemInWaiting={popUpItemInWaiting}
                setPopUpItemInWaiting={setPopUpItemInWaiting}
              />
            ))}
          </div>
          <div className="buttons-cnt">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setTheseItems([...theseItems, popUpItemInWaiting])}
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

const DynamicTextInput = ({
  field,
  listItemInWaiting,
  setIt,
  popUpItemInWaiting,
  setPopUpItemInWaiting,
}) => {
  return (
    <TextField
      label={field}
      onChange={(e) => {
        setPopUpItemInWaiting({
          ...popUpItemInWaiting,
          [field]: e.target.value,
        });
        console.log(popUpItemInWaiting);
      }}
    />
  );
};
