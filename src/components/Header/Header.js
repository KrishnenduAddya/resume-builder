import React from 'react';
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.containerDiv}>
        <div className={styles.headerContainer}>
          <div className="ml-12">
              <p className={styles.heading} onClick={() => {navigate("/")}}>My Resume Builder</p>
          </div>
          <div className={styles.linksContainer}>
              <p className={styles.heading} onClick={() => {navigate("/")}}>Home</p>
              <div className={styles.buildDiv}>
                  <p className={styles.build} onClick={() => {navigate("/resume")}}>Build My Resume</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Header;