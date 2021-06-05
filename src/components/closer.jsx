import React from "react";
import { IconButton } from "@material-ui/core";
import { CancelRounded } from "@material-ui/icons";

const Closer = ({ text, clickFunction, opacity }) => {
  return (
    <div
      className="cancel-button flex align-center"
      onClick={() => clickFunction()}
      style={{opacity: opacity}}
    >
      <div className="subtitle">{text}</div>
      <IconButton aria-label={text}>
        <CancelRounded />
      </IconButton>
    </div>
  );
};

export default Closer;
