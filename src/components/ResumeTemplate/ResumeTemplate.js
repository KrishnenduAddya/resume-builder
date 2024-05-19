import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  Calendar,
  Divide,
  GitHub,
  Paperclip,
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import styles from "./ResumeTemplate.module.css";
import Skill from "../Skill/Skill";
import { Link } from "react-router-dom";

const ResumeTemplate = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");
  const [skillArray, setSkillArray] = useState([]);

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    skill:information[sections.skill],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary]
  };

  useEffect(() => {
    const skills = info?.skill?.detail?.toString();
    let arr;
    if(skills !== undefined)
    {
      arr = skills.split(',');
    }
    setSkillArray(arr);
  }, [info.skill]);

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return ` ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()} `;
  };

  const sectionDiv = {
    [sections.summary]: (
      <div>
          <div className={styles.titleSectionContainer} key={"summary"} draggable
            onDragOver={() => seTarget(info.summary?.id)}
            onDragEnd={() => setSource(info.summary?.id)}>
            <div className={styles.circle}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
              <div
                className={`${styles.section} ${
                  info.summary?.sectionTitle ? "" : styles.hidden
                }`}
              >
                <div className={styles.sectionTitle}>
                  {info.summary?.sectionTitle}
                </div>
              </div>
          </div>
          <div className={styles.content}>
            <div className={styles.overview}>
              <p className={styles.summary}>{info.summary?.detail}</p>
            </div>
          </div>
      </div>
    ),
    [sections.skill]: (
      <div>
      <div className={styles.titleSectionContainer} key={"skill"} draggable
          onDragOver={() => seTarget(info.skill?.id)}
          onDragEnd={() => setSource(info.skill?.id)}>
        <div className={styles.circle}><i class="fa fa-cogs" aria-hidden="true"></i></div>
        <div
          className={`${styles.section} ${
            info.skill?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>
            {info.skill?.sectionTitle}
          </div>
        </div>
        </div>
        <div className={styles.content}>
          <div className={styles.overview}>
            {skillArray?.map((skill) => (
              skill.trim() !== "" && <Skill key={skill} skill={skill}/>
            ))}
          </div>
        </div>
      </div>
    ),
    [sections.workExp]: (
      <div>
      <div className={styles.titleSectionContainer} key={"workexp"} draggable
          onDragOver={() => seTarget(info.workExp?.id)}
          onDragEnd={() => setSource(info.workExp?.id)}>
        <div className={styles.circle}><i class="fa fa-briefcase" aria-hidden="true"></i></div>
        <div
          className={`${styles.section} ${
            info.workExp?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>
            {info.workExp?.sectionTitle}
          </div>
        </div>
        </div>
        <div className={styles.content}>
        <div className={styles.overview}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <p className={styles.subTitle}>{item.companyName}, {item.location ? item.location:  ""}</p>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} - 
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    ),
    [sections.project]: (
      <div>
      <div className={styles.titleSectionContainer} key={"project"} draggable
          onDragOver={() => seTarget(info.project?.id)}
          onDragEnd={() => setSource(info.project?.id)}>
        <div className={styles.circle}><i class="fa fa-align-center" aria-hidden="true"></i></div>
        <div
          className={`${styles.section} ${
            info.project?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>
            {info.project?.sectionTitle}
          </div>
        </div>
        </div>
        <div className={styles.content}>
        <div className={styles.overview}>
          {info.project?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.overview ? (
                <p className={styles.overview}>{item.overview} </p>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    ),
    [sections.education]: (
      <div>
      <div className={styles.titleSectionContainer} key={"education"} draggable
          onDragOver={() => seTarget(info.education?.id)}
          onDragEnd={() => setSource(info.education?.id)}>
        <div className={styles.circle}><i class="fa fa-graduation-cap" aria-hidden="true"></i></div>
        <div
          className={`${styles.section} ${
            info.education?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>
            {info.education?.sectionTitle}
          </div>
        </div>
        </div>
        <div className={styles.content}>
        <div className={styles.overview}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <div className={styles.collegePercentageDiv}>
                  <div style={{width: '90%'}}><p className={styles.subTitle}>{item.college}</p></div>
                  <div>
                    {item.percentage ? (
                      <p style={{width: '10%', textAlign:'right'}}>{item.percentage}{(item.percentage > 10 && !item.percentage.includes('%')) ? "%" : "" }</p>
                    ) : (
                  <span />
                  )}
                  </div>
                </div>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} - 
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div>
      <div className={styles.titleSectionContainer} key={"achievement"} draggable
          onDragOver={() => seTarget(info.achievement?.id)}
          onDragEnd={() => setSource(info.achievement?.id)}>
        <div className={styles.circle}><i class="fa fa-trophy" aria-hidden="true"></i></div>
        <div
          className={`${styles.section} ${
            info.achievement?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>
            {info.achievement?.sectionTitle}
          </div>
        </div>
        </div>
        <div className={styles.content}>
        <div className={styles.overview}>
          {info.achievement?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.achievement?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          </div>
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.summary, sections.workExp, sections.education],
      [sections.skill, sections.project, sections.achievement],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;

    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <div ref={ref} >
      <div ref={containerRef} className={styles.container}>
          <div className={styles.headerContainer}>
              <div className={styles.header}>
                <p className={styles.heading}>{info.basicInfo?.detail?.name || "Abc Xyz"}</p>
                <p className={styles.subHeading}>{info.basicInfo?.detail?.title || "Work Title"}</p>
                <div className={styles.links}>
                  {info.basicInfo?.detail?.email ? (
                    <Link to={"mailto:"+info.basicInfo?.detail?.email} className={styles.link} type="email">
                      <p><FontAwesomeIcon icon={faEnvelope} /> {info.basicInfo?.detail?.email }</p>
                    </Link>
                  ) : (
                    <Link to="mailto:abc@xyz.com" className={styles.link} type="email">
                      <p><FontAwesomeIcon icon={faEnvelope} /> {"abc@xyz.com"}</p>
                    </Link>
                  )}
                  {info.basicInfo?.detail?.phone ? (
                    <Link className={styles.link}>
                      <FontAwesomeIcon icon={faPhone}/> {info.basicInfo?.detail?.phone}
                    </Link>
                  ) : (
                    <Link className={styles.link}>
                      <FontAwesomeIcon icon={faPhone}/> {"+91-9876543210"}
                    </Link>
                  )}
                  {info.basicInfo?.detail?.linkedin ? (
                    <Link to={info.basicInfo?.detail?.linkedin} target="_blank" className={styles.link}>
                      <FontAwesomeIcon icon={faLinkedin}/> {info.basicInfo?.detail?.linkedin}
                    </Link>
                  ) : (
                    <Link to="https://www.linkedin.com/profile" target="_blank"className={styles.link}>
                      <FontAwesomeIcon icon={faLinkedin}/> {"https://www.linkedin.com/profile"}
                    </Link>
                  )}
                  {info.basicInfo?.detail?.github ? (
                    <Link to={info.basicInfo?.detail?.github} target="_blank" className={styles.link}>
                      <FontAwesomeIcon icon={faGithub}/> {info.basicInfo?.detail?.github}
                    </Link>
                  ) : (
                    <Link to="https://github.com/profile" target="_blank" className={styles.link}>
                      <FontAwesomeIcon icon={faGithub}/> {"https://github.com/profile"}
                    </Link>
                  )}
                  
                </div>
                {/* <hr style={{
                  background: '#5695cd',
                  height: 1,
                  width:700,
                  marginTop:15,
                  marginBottom:-18
              }}
              /> */}
          </div>
        </div>
      
          <div className={styles.sectionContainer}>
            <div className={styles.main}>
              <div className={styles.col1}>
                {columns[0].map((item) => sectionDiv[item])}
              </div>
              <div className={styles.col2}>
                {columns[1].map((item) => sectionDiv[item])}
              </div>
            </div>
          </div>
        </div>

      </div>
  );
});

export default ResumeTemplate;
