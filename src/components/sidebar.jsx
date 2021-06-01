import { Button } from "@material-ui/core";
import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";

const Sidebar = () => {
  return (
    <>
      <div
        className="cv-builder-columns"
        style={{ position: "fixed", width: "100%", pointerEvents: "none" }}
      >
        <div className="sidebar-cnt">
          <div className="sidebar">Sidebar</div>
          <div className="download buttons-cnt">
            <Button
              startIcon={<GetAppIcon />}
              variant="contained"
              color="primary"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
