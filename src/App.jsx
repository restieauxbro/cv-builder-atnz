import React, { Suspense } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import CvUi from "./components/cv-ui";
import Sidebar from "./components/sidebar";
import HelpSwitchProvider from "./components/providers/HelpProvider";
import CVDataProvider from "./components/providers/CVDataProvider";
import StyleProvider from "./components/providers/StyleProvider";
import PDFViewerComponent from "./components/pdf-viewer";
import { CircularProgress } from "@material-ui/core";
import CvAnimSwap from "./components/changingState/cvAnimSwap";

const App = () => {
  return (
    <>
      <StyleProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CVDataProvider>
            <AnimateSharedLayout>
              <div className="cv-builder-columns">
                <div className="placeholder"></div>
                <Sidebar />

                <HelpSwitchProvider>
                  <CvAnimSwap />
                </HelpSwitchProvider>
              </div>
            </AnimateSharedLayout>
          </CVDataProvider>
        </MuiPickersUtilsProvider>
      </StyleProvider>
    </>
  );
};

export default App;
