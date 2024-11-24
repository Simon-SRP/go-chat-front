import React, { useState } from "react";
import styles from "./input.module.css"


const Input = ({ placeholder, onChange , type = "text"}) => { 
    const [value, setValue] = useState(''); 
  
    const handleChange = (event) => {
      setValue(event.target.value);
      if (onChange) {
        onChange(event.target.value); 
      }
    };
  
    return (
      <input
        className={styles.input}
        value={value} 
        type={type}
        onChange={handleChange}
        placeholder={placeholder} 
      />
    );
  };
export default Input;