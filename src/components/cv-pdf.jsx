import React from "react";
import { v4 as uuidv4 } from "uuid";
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
        <ExperienceSection />
      </Page>
    </Document>
  );
};

export default CVPDF;

const ExperienceSection = () => {
  const jobs = useCVData().jobs;
  return ( <View>
    <Text style={{ marginTop: 0 }}>Experience</Text>
    <View className="jobs-list">
      <View className="line" />
      {jobs.map(({ jobtitle, date, description, company, id }) => (
        <Job
          jobtitle={jobtitle}
          company={company}
          id={id}
          date={date}
          description={description}
          
        />
      ))}
    </View>
    </View> );
}


const Job = ({
  jobtitle,
  company,
  date,
  description,
  id
}) => {
  const jobId = id;
  return (
    <View id={jobId} key={uuidv4()}>
      <View className="job-cnt">
        <View className="content">
          <Text>
            <span className="dark-text"> {jobtitle}</span> <br />
            <span className="light-text">{company}</span>
          </Text>
          <Text>{date}</Text>
          <Text>{description}</Text>
        </View>
        
      </View>
    </View>
  );
};