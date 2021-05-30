import React from "react";
import { IconButton } from "@material-ui/core";
import { CancelRounded } from "@material-ui/icons";

const Closer = ({ text, clickFunction }) => {
  return (
    <div
      className="cancel-button flex align-center"
      onClick={() => clickFunction()}
    >
      <div className="subtitle">{text}</div>
      <IconButton aria-label={text}>
        <CancelRounded />
      </IconButton>
    </div>
  );
};

export default Closer;
