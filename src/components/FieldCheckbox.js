import React from "react";
import { useField } from "@formiz/core";

const FieldCheckbox = (props) => {
  // console.log('props', props);
  const {
    errorMessage,
    id,
    isValid,
    isPristine,
    isSubmitted,
    resetKey,
    setValue,
    value,
  } = useField(props);
  // console.log('value', props.value);
  const { label, type, required } = props;
  const [isFocused, setIsFocused] = React.useState(true);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  const [checked, setChecked] = React.useState("Oui");

  const handleChange = (e) => {
    //need because testing value and boolean false data
    if (checked === "Non"){
      setChecked("Oui")
    } else if (checked === "Oui"){
      setChecked("Non")
    }
    setValue(checked);
  }



  return (
    <>
      <label className="demo-label" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        type={"checkbox"}
        placeholder={"Répondez ici ..."}
        value={props.value || "Non"}
        className="demo-input"
        // onChange={() => setChecked(!checked)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
      />
      {showError && <div id={`${id}-error`}>{errorMessage}</div>}
    </>
  );
};

export default FieldCheckbox;
