import React from 'react';
import styles from "./InputTextArea.module.css";

const InputTextArea = ({ label, ...props }) => {
    return (
        <div className={styles.container}>
          {label && <label className={styles.label}>{label}</label>}
          <textarea type="text" {...props} rows={5} cols={65} />
        </div>
      );
}

export default InputTextArea;