import React from "react";
import { useField } from "@formiz/core";

const FieldRadio = (props) => {
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

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <label className="demo-label" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        type={"radio"}
        placeholder={"Répondez ici ..."}
        value={props.value}
        className="demo-input"
        // onChange={() => setChecked(!checked)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
      />
      {showError && <div id={`${id}-error`}>{errorMessage}</div>}
    </>
  );
};

export default FieldRadio;
