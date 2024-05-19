import React, { useRef, useState } from 'react';
import styles from "./Resume.module.css";
import ResumeEditor from '../ResumeEditor/ResumeEditor';
import ResumeTemplate from '../ResumeTemplate/ResumeTemplate';
import ReactToPrint from 'react-to-print';
import Header from '../Header/Header';

const Resume = () => {
  const sections = {
    basicInfo: "Basic Info",
    summary: "Summary",
    workExp: "Work Exp",
    project: "Project",
    education: "Education",
    skill: "Skills",
    achievement: "Achievements",
  };

  const resumeRef = useRef();

  const colors = ["#ffffff", "#48bb78", "#0bc5ea", "#F9629F", "#fd5c63",];
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.skill]: {
      id: sections.skill,
      sectionTitle: sections.skill,
      detail: [],
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    }
  });

  
  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <div className={styles.containerHeadline}>
        <div className={styles.headline}>Enter your details and build your resume</div>
        <div className={styles.toolbar}>
            {colors.map((item) => (
              <span
                key={item}
                style={{ backgroundColor: item }}
                className={`${styles.color} ${
                  activeColor === item ? styles.active : ""
                }`}
                onClick={() => setActiveColor(item)}
              />
            ))}
          </div>
          <div>
          <ReactToPrint
            trigger={() => {
              return (
                <button className={styles.downloadButton}>
                  Download 🠧
                </button>
              );
            }}
            content={() => resumeRef.current}
          />
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.main}>
            <ResumeEditor
              sections={sections}
              information={resumeInformation}
              setInformation={setResumeInformation}
            />
          </div>
          <div className={styles.template}>
            <ResumeTemplate
              ref={resumeRef}
              sections={sections}
              information={resumeInformation}
              activeColor={activeColor}
            />
          </div>
      </div>
    </div>
    </div>
  );
    
}

export default Resume;