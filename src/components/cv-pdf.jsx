import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useCVData } from "./providers/CVDataProvider";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const CVPDF = ({ cvData }) => {
  const personalDetails = cvData.personalDetails;
  //   const jobs = useCVData().jobs;
  //   const education = useCVData().education;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{personalDetails.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>{personalDetails.intro}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CVPDF;
