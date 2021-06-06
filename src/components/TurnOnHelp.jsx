import React, { useState } from "react";
import { ContactSupportRoundedIcon, ChatBubbleIcon } from "@material-ui/icons";
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
            <div className="help-button flex align-center">
              <IconButton aria-label="Helpers on">
                <ChatBubbleIcon />
              </IconButton>
              <div className="subtitle">Helpers on</div>
            </div>
          ) : (
            <div className="placeholder"></div>
          )}
        </>
      )}
    </>
  );
};

export default TurnOnHelp;
