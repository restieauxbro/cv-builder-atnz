import React from "react";
import { AnimateSharedLayout } from "framer-motion";
import Sidebar from "../components/sidebar";
import HelpSwitchProvider from "../components/providers/HelpProvider";
import CvAnimSwap from "../components/changingState/cvAnimSwap";
import CVPDF from "../components/cv-pdf";
import { useCVData } from "../components/providers/CVDataProvider";
import { PDFViewer } from "@react-pdf/renderer";
import Controls from "../components/layout/controls";

const CVBuilderPage = () => {
  const cvData = useCVData();
  return (
    <AnimateSharedLayout>
      <Controls/>

      <HelpSwitchProvider>
        {/* <PDFViewer style={{width: "100%", height: `100vh`}}>
          <CVPDF cvData={cvData} />
        </PDFViewer> */}
        <CvAnimSwap />
      </HelpSwitchProvider>
    </AnimateSharedLayout>
  );
};

export default CVBuilderPage;
