import React from 'react';
import styles from "./Home.module.css";
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div>
        <Header/>
        <div className={styles.container}>
            <div className={styles.homeHeading}>
                <div>The resume to land your dream job.</div>
                <div>Create an impressive resume in minutes. Free to Download.</div><br/>
                <button className={styles.build} onClick={() => {navigate("/resume")}}>Create your resume now</button>
            </div>
            <div>
                <img src="assets/bg.jpg" style={{paddingTop:50}} width={600} alt="bg"/>
            </div>
        </div>
    </div>
  )
}

export default HomePage;