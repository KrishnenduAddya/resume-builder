import React from 'react';
import styles from "./InputText.module.css";

const InputText = ({ label, ...props }) => {
    return (
        <div className={styles.container}>
          {label && <label>{label}</label>}
          <input type="text" {...props} />
        </div>
      );
}

export default InputText