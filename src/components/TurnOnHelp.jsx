import React, { useState } from "react";
import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";
import { IconButton } from "@material-ui/core";
import {
  useHelpPermission,
  useHelpPermissionUpdate,
} from "./providers/HelpProvider";

const TurnOnHelp = () => {
  const helpPermission = useHelpPermission();
  const helpPermissionUpdate = useHelpPermissionUpdate();
  const [turnedOn, setTurnedOn] = useState(false);
  return (
    <>
      {helpPermission === false ? (
        <div
          className="help-button flex align-center"
          onClick={() => {
            helpPermissionUpdate(true);
            setTurnedOn(true);
          }}
        >
          <IconButton aria-label="turn on help">
            <ContactSupportRoundedIcon />
          </IconButton>
          <div className="subtitle">Turn on helpers</div>
        </div>
      ) : (
        <>
          {turnedOn ? (
            <div>Helpers on</div>
          ) : (
            <div className="placeholder"></div>
          )}
        </>
      )}
    </>
  );
};

export default TurnOnHelp;
