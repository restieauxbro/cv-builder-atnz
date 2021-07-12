import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import CVPDF from "./cv-pdf";
import { useCVData } from "./providers/CVDataProvider";

const PDFViewerComponent = () => {
  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <CVPDF cvData={useCVData()} />
      </PDFViewer>
    </>
  );
};

export default PDFViewerComponent;
