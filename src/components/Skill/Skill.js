import React from 'react';
import styles from "./Skill.module.css";

const Skill = ({ skill }) => {
    return (
          <div className={styles.skillLabel}>{skill}</div>
      );
}

export default Skill;