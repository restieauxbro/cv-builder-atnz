import React from "react";
import { AnimateSharedLayout } from "framer-motion";
import Sidebar from "../components/sidebar";
import HelpSwitchProvider from "../components/providers/HelpProvider";
import CvAnimSwap from "../components/changingState/cvAnimSwap";

const CVBuilderPage = () => {
  return (
    <AnimateSharedLayout>
      <Sidebar />
      

        <HelpSwitchProvider>
          <CvAnimSwap />
        </HelpSwitchProvider>
    
    </AnimateSharedLayout>
  );
};

export default CVBuilderPage;
