import React, { useEffect, useState } from 'react'
import styles from "./ResumeEditor.module.css";
import InputText from '../InputText/InputText';
import InputTextArea from '../InputTextArea/InputTextArea';
import { X } from 'react-feather';

const ResumeEditor = (props) => {
    const sections = props.sections;
    const information = props.information;
    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(sections)[0]
      );
      const [activeInformation, setActiveInformation] = useState(
        information[sections[Object.keys(sections)[0]]]
      );
      const [sectionTitle, setSectionTitle] = useState(
        sections[Object.keys(sections)[0]]
      );
      const [values, setValues] = useState({
        name: activeInformation?.detail?.name || "",
        title: activeInformation?.detail?.title || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        github: activeInformation?.detail?.github || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
      });
      const handlePointUpdate = (value, index) => {
        const tempValues = { ...values };
        if (!Array.isArray(tempValues.points)) tempValues.points = [];
        tempValues.points[index] = value;
        setValues(tempValues);
      };
    
      const [activeDetailIndex, setActiveDetailIndex] = useState(0);

      const handleSubmission = () => {
        switch (sections[activeSectionKey]) {
          case sections.basicInfo: {
            const tempDetail = {
              name: values.name,
              title: values.title,
              linkedin: values.linkedin,
              github: values.github,
              email: values.email,
              phone: values.phone,
            };
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.basicInfo]: {
                ...prev[sections.basicInfo],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.workExp: {
            const tempDetail = {
              title: values.title,
              startDate: values.startDate,
              endDate: values.endDate,
              companyName: values.companyName,
              location: values.location,
              points: values.points,
            };
            const tempDetails = [...information[sections.workExp]?.details];
            tempDetails[activeDetailIndex] = tempDetail;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.workExp]: {
                ...prev[sections.workExp],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.project: {
            const tempDetail = {
              title: values.title,
              overview: values.overview,
              github: values.github,
              points: values.points,
            };
            const tempDetails = [...information[sections.project]?.details];
            tempDetails[activeDetailIndex] = tempDetail;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.project]: {
                ...prev[sections.project],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.education: {
            const tempDetail = {
              title: values.title,
              college: values.college,
              percentage: values.percentage,
              startDate: values.startDate,
              endDate: values.endDate,
            };
            const tempDetails = [...information[sections.education]?.details];
            tempDetails[activeDetailIndex] = tempDetail;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.education]: {
                ...prev[sections.education],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.achievement: {
            const tempPoints = values.points;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.achievement]: {
                ...prev[sections.achievement],
                points: tempPoints,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.summary: {
            const tempDetail = values.summary;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.summary]: {
                ...prev[sections.summary],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.skill: {
            const tempDetail = values.skill;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.skill]: {
                ...prev[sections.skill],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          default: console.log("Default");
        }
      };
      const workExpBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputText
              label="Title"
              placeholder="Enter title e.g. Frontend developer"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
            <InputText
              label="Company Name"
              placeholder="Enter company name e.g. Google"
              value={values.companyName}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, companyName: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputText
              label="Location"
              placeholder="Enter location e.g. Kolkata"
              value={values.location}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, location: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputText
              label="Start Date"
              type="date"
              placeholder="Enter start date of work"
              value={values.startDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, startDate: event.target.value }))
              }
            />
            <InputText
              label="End Date"
              type="date"
              placeholder="Enter end date of work"
              value={values.endDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, endDate: event.target.value }))
              }
            />
          </div>
    
          <div className={styles.column}>
            <label>Description</label>
            <InputText
              placeholder="Line 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputText
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputText
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
          </div>
        </div>
      );
      const projectBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputText
              label="Title"
              value={values.title}
              placeholder="Enter title"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <InputText
            label="Overview"
            value={values.overview}
            placeholder="Enter basic overview of project"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, overview: event.target.value }))
            }
          />
          <div className={styles.row}>
            <InputText
              label="Github Link"
              value={values.github}
              placeholder="Enter github link of the project"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, github: event.target.value }))
              }
            />
          </div>
          <div className={styles.column}>
            <label>Description</label>
            <InputText
              placeholder="Line 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputText
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputText
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
          </div>
        </div>
      );
      const educationBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputText
              label="Course Name"
              value={values.title}
              placeholder="Enter course name e.g. B.Tech"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
          <InputText
            label="College/School Name"
            value={values.college}
            placeholder="Enter name of your college/school"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, college: event.target.value }))
            }
          />
          <InputText
            label="Percentage/CGPA"
            value={values.percentage}
            placeholder="Enter your percentage/cgpa"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, percentage: event.target.value }))
            }
          />
          </div>
          <div className={styles.row}>
            <InputText
              label="Start Date"
              type="date"
              placeholder="Enter start date of this education"
              value={values.startDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, startDate: event.target.value }))
              }
            />
            <InputText
              label="End Date"
              type="date"
              placeholder="Enter end date of this education"
              value={values.endDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, endDate: event.target.value }))
              }
            />
          </div>
        </div>
      );
      const basicInfoBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputText
              label="Name"
              placeholder="What is your good name?"
              value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
            />
            <InputText
              label="Title"
              value={values.title}
              placeholder="Enter your title e.g. software developer"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputText
              label="Email"
              value={values.email}
              placeholder="Enter your email"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <InputText
              label="Enter phone"
              value={values.phone}
              placeholder="Enter your phone number"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputText
              label="Linkedin Link"
              value={values.linkedin}
              placeholder="Enter your linkedin profile link"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, linkedin: event.target.value }))
              }
            />
            <InputText
              label="Github Link"
              value={values.github}
              placeholder="Enter your github profile link"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, github: event.target.value }))
              }
            />
          </div>
        </div>
      );
      const achievementsBody = (
        <div className={styles.detail}>
          <div className={styles.column}>
            <label>Achievements</label>
            <InputText
              placeholder="Line 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputText
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputText
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
          </div>
        </div>
      );
      const summaryBody = (
        <div className={styles.detail}>
          <InputTextArea
            label="Summary"
            value={values.summary}
            placeholder="Enter your objective/summary"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, summary: event.target.value }))
            }
          />
        </div>
      );
      const skillBody = (
        <div className={styles.detail}>
          <InputTextArea
            label="Skill"
            value={values.skill}
            placeholder="Enter your skills comma separated e.g. C#, React, Web Development"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, skill: event.target.value }))
            }
          />
        </div>
      );
      const generateBody = () => {
        switch (sections[activeSectionKey]) {
          case sections.basicInfo:
            return basicInfoBody;
          case sections.workExp:
            return workExpBody;
          case sections.project:
            return projectBody;
          case sections.education:
            return educationBody;
          case sections.achievement:
            return achievementsBody;
          case sections.summary:
            return summaryBody;
          case sections.skill:
            return skillBody;
          default:
            return null;
        }
      };

    const handleAddNew = () => {
      const details = activeInformation?.details;
      if (!details) return;
      const lastDetail = details.slice(-1)[0];
      if (!Object.keys(lastDetail).length) return;
      details?.push({});
  
      props.setInformation((prev) => ({
        ...prev,
        [sections[activeSectionKey]]: {
          ...information[sections[activeSectionKey]],
          details: details,
        },
      }));
      setActiveDetailIndex(details?.length - 1);
    };

    const handleDeleteDetail = (index) => {
      const details = activeInformation?.details
        ? [...activeInformation?.details]
        : "";
      if (!details) return;
      details.splice(index, 1);
      props.setInformation((prev) => ({
        ...prev,
        [sections[activeSectionKey]]: {
          ...information[sections[activeSectionKey]],
          details: details,
        },
      }));
  
      setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
    };

    useEffect(() => {
      const activeInfo = information[sections[activeSectionKey]];
      setActiveInformation(activeInfo);
      setSectionTitle(sections[activeSectionKey]);
      setActiveDetailIndex(0);
      setValues({
        name: activeInfo?.detail?.name || "",
        overview: activeInfo?.details
          ? activeInfo.details[0]?.overview || ""
          : "",
        link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
        certificationLink: activeInfo?.details
          ? activeInfo.details[0]?.certificationLink || ""
          : "",
        companyName: activeInfo?.details
          ? activeInfo.details[0]?.companyName || ""
          : "",
        college: activeInfo?.details
          ? activeInfo.details[0]?.college || ""
          : "",
        percentage: activeInfo?.details
        ? activeInfo.details[0]?.percentage || ""
        : "",
        location: activeInfo?.details
          ? activeInfo.details[0]?.location || ""
          : "",
        startDate: activeInfo?.details
          ? activeInfo.details[0]?.startDate || ""
          : "",
        endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
        points: activeInfo?.details
          ? activeInfo.details[0]?.points
            ? [...activeInfo.details[0]?.points]
            : ""
          : activeInfo?.points
          ? [...activeInfo.points]
          : "",
        title: activeInfo?.details
          ? activeInfo.details[0]?.title || ""
          : activeInfo?.detail?.title || "",
        linkedin: activeInfo?.detail?.linkedin || "",
        github: activeInfo?.details
          ? activeInfo.details[0]?.github || ""
          : activeInfo?.detail?.github || "",
        phone: activeInfo?.detail?.phone || "",
        email: activeInfo?.detail?.email || "",
        summary: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
        other: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
      });
    }, [activeSectionKey]);
  
    useEffect(() => {
      setActiveInformation(information[sections[activeSectionKey]]);
    }, [information]);
  
    useEffect(() => {
      const details = activeInformation?.details;
      if (!details) return;
  
      const activeInfo = information[sections[activeSectionKey]];
      setValues({
        overview: activeInfo.details[activeDetailIndex]?.overview || "",
        link: activeInfo.details[activeDetailIndex]?.link || "",
        certificationLink:
          activeInfo.details[activeDetailIndex]?.certificationLink || "",
        companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
        location: activeInfo.details[activeDetailIndex]?.location || "",
        startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
        endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
        points: activeInfo.details[activeDetailIndex]?.points || "",
        title: activeInfo.details[activeDetailIndex]?.title || "",
        linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
        github: activeInfo.details[activeDetailIndex]?.github || "",
        college: activeInfo.details[activeDetailIndex]?.college || "",
        percentage: activeInfo.details[activeDetailIndex]?.percentage || "",
      });
    }, [activeDetailIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {Object.keys(sections)?.map((key) => (
          <div
            className={`${styles.section} ${
              activeSectionKey === key ? styles.active : ""
            }`}
            key={key}
            onClick={() => setActiveSectionKey(key)}
          >
            {sections[key]}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        
        <InputText
          label="Section Title"
          placeholder="Enter section title"
          value={sectionTitle}
          onChange={(event) => setSectionTitle(event.target.value)}
        />

<div className={styles.chips}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${styles.chip} ${
                    activeDetailIndex === index ? styles.active : ""
                  }`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeSectionKey]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
                </div>
              ))
            : ""}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className={styles.new} onClick={handleAddNew}>
              + New
            </div>
          ) : (
            ""
          )}
        </div>

        {generateBody()}

        <button onClick={handleSubmission}>Save</button>
      </div>
    </div>
  )
}

export default ResumeEditor;