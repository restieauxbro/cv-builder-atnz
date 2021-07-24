import React, { Suspense } from "react";
import { AnimateSharedLayout } from "framer-motion";
import Sidebar from "./components/sidebar";
import HelpSwitchProvider from "./components/providers/HelpProvider";
import CVDataProvider from "./components/providers/CVDataProvider";
import StyleProvider from "./components/providers/StyleProvider";
import CvAnimSwap from "./components/changingState/cvAnimSwap";

const App = () => {
  return (
    <>
      <StyleProvider>
       
          <CVDataProvider>
            <AnimateSharedLayout>
              <div className="cv-builder-columns">
                <div className="placeholder"></div> 
                {/* Placeholder pushes the grid into the right format while another grid is in fixed positon above */}
                <Sidebar />

                <HelpSwitchProvider>
                  <CvAnimSwap />
                </HelpSwitchProvider>
              </div>
            </AnimateSharedLayout>
          </CVDataProvider>
        
      </StyleProvider>
    </>
  );
};

export default App;
