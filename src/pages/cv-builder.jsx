import React from "react";
import { AnimateSharedLayout } from "framer-motion";
import HelpSwitchProvider from "../components/providers/HelpProvider";
import CvAnimSwap from "../components/changingState/cvAnimSwap";
import { useCVData } from "../components/providers/CVDataProvider";
import Controls from "../components/layout/controls";
// import CVPDF from "../components/cv-pdf";
// import { PDFViewer } from "@react-pdf/renderer";

const CVBuilderPage = () => {
  const cvData = useCVData();
  return (
    <AnimateSharedLayout>
      <Controls/>

      <HelpSwitchProvider>
        <CvAnimSwap />
         {/* <PDFViewer style={{width: "100%", height: `100vh`}}>
          <CVPDF cvData={cvData} />
        </PDFViewer>  */}
      </HelpSwitchProvider>
    </AnimateSharedLayout>
  );
};

export default CVBuilderPage;
