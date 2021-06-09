import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import CvUi from "./components/cv-ui";
import Sidebar from "./components/sidebar";
import HelpSwitchProvider from "./components/providers/HelpProvider";
import CVDataProvider from "./components/providers/CVDataProvider";
import StyleProvider from "./components/providers/StyleProvider";

const App = () => {
  return (
    <>
      <StyleProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CVDataProvider>
            <div className="cv-builder-columns">
              <div className="placeholder"></div>
              <Sidebar />

              <HelpSwitchProvider>
                <CvUi />
              </HelpSwitchProvider>
            </div>
          </CVDataProvider>
        </MuiPickersUtilsProvider>
      </StyleProvider>
    </>
  );
};

export default App;
