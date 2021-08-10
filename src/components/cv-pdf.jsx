import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import PoppinsRegular from "../fonts/Poppins.ttf";
import PoppinsBold from "../fonts/Poppins-Bold.ttf";
import PoppinsExtrabold from "../fonts/Poppins-ExtraBold.ttf";

Font.register({
  family: "Poppins",
  src: PoppinsRegular,
});

Font.register({
  family: "Poppins-bold",
  src: PoppinsBold,
});

Font.register({
  family: "Poppins-extrabold",
  src: PoppinsExtrabold,
});

const colors = {
  light: "#6ebcd9",
  dark: "#074b64",
};

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Poppins",
    fontSize: 8,
    padding: 50,
  },
  section: {
    marginTop: 12,
  },
  para: {
    marginTop: 5,
  },
  formGrid: {
    display: "flex",
    flexDirection: "row",
  },
  column1: {
    width: "40%",
    marginRight: 40,
  },
  column2: {
    width: "calc(100% - 40% - 40px)",
  },
  h1: {
    fontSize: 25,
    marginBottom: 30,
    fontWeight: 700,
    fontFamily: "Poppins-extrabold",
    color: colors.dark,
  },

  h2: {
    // For section headings
    fontSize: 14,
    color: colors.dark,
  },
  h3: {
    // For titles within sections
    fontSize: 11,
    marginBottom: 5,
  },
  darkText: {
    color: colors.dark,
  },
  lightText: {
    color: colors.light,
  },
  jobsContainer: {
    position: "relative",
    paddingLeft: 15,
  },
  timeline: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    borderTop: "15px solid white",
    borderBottom: "3px solid white",
    width: 1,
    backgroundColor: colors.light,
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
        <View style={styles.formGrid}>
          <View style={styles.column1}></View>
          <Text style={{ ...styles.column2, ...styles.h1 }}>
            {`${personalDetails.firstName} ${personalDetails.lastName}`}
          </Text>
        </View>

        <View style={styles.formGrid}>
          <View style={styles.column1}>
            <Text style={styles.para}>{personalDetails.email}</Text>
            <Text style={styles.para}>{personalDetails.phone}</Text>
            <Text style={styles.para}>{personalDetails.address}</Text>
            <Text style={{ ...styles.section, ...styles.h2 }}>
              Introduction
            </Text>
            <Text style={styles.section}>{personalDetails.intro}</Text>
            <View>
              <Education cvData={cvData} />
            </View>
            <View>
              <Skills cvData={cvData} />
            </View>
          </View>
          <View style={styles.column2}>
            <ExperienceSection cvData={cvData} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVPDF;

const ExperienceSection = ({ cvData }) => {
  const jobs = cvData.jobs;
  return (
    <View>
      {jobs && (
        <>
          <Text style={styles.h2}>Experience</Text>
          <View style={styles.jobsContainer}>
            <View style={styles.timeline} />
            {jobs.map(({ jobtitle, date, description, company, id }) => (
              <Job
                key={`${jobtitle}-${company}`}
                jobtitle={jobtitle}
                company={company}
                id={id}
                date={date}
                description={description}
              />
            ))}
          </View>
          <Text style={{ marginTop: 30 }}>References on request</Text>
        </>
      )}
    </View>
  );
};

const Job = ({ jobtitle, company, date, description, id }) => {
  const jobId = id;
  return (
    <View id={jobId} key={uuidv4()} style={styles.section}>
      <View className="job-cnt">
        <View className="content">
          <Text style={styles.darkText} className="dark-text">
            {jobtitle}
          </Text>
          <Text style={styles.lightText} className="light-text">
            {company}
          </Text>

          <Text style={styles.para}>{date}</Text>
        </View>
        <Text style={styles.para}>{description}</Text>
      </View>
    </View>
  );
};

const Education = ({ cvData }) => {
  const listItems = cvData.education;
  return (
    <>
      {listItems && (
        <>
          <Text style={{ ...styles.section, ...styles.h2 }}>Education</Text>
          <View style={styles.para}>
            {listItems.map((listItem) => {
              const keyValues = Object.values(listItem.properties);
              return (
                <View key={uuidv4()} className="Viewst-item">
                  {keyValues.map((keyValue) => (
                    <Text key={uuidv4()} style={styles.para}>
                      {keyValue}
                    </Text>
                  ))}
                </View>
              );
            })}
          </View>
        </>
      )}
    </>
  );
};
const Skills = ({ cvData }) => {
  const listItems = cvData.skills;
  return (
    <>
      <Text style={{ ...styles.section, ...styles.h2 }}>
        Skills and attributes
      </Text>
      <View style={styles.para}>
        {listItems &&
          listItems.map((listItem) => {
            const keyValues = Object.values(listItem.properties);
            return (
              <View key={uuidv4()} className="Viewst-item">
                {keyValues.map((keyValue) => (
                  <Text key={uuidv4()} style={styles.para}>
                    {keyValue}
                  </Text>
                ))}
              </View>
            );
          })}
      </View>
    </>
  );
};
