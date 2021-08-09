import React from 'react';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { motion, AnimateSharedLayout } from "framer-motion";
import Closer from '../closer';
import { v4 as uuidv4 } from "uuid";
import { IconButton } from '@material-ui/core';

const DraggableListItems = ({ editableListItems, deleteItem, remapItems }) => {
    return (
      <AnimateSharedLayout>
        <ul className="editable-list-items">
          {editableListItems && editableListItems.map((editable, index) => {
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

  export default DraggableListItems