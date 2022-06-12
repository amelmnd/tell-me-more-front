import React from "react";
import { useField } from "@formiz/core";

const FieldEmail = (props) => {
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
  const { label, type } = props;
  const [isFocused, setIsFocused] = React.useState(true);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  
  return (
    <div className={`email-form ${showError ? "is-error" : ""}`}>
      <input
        key={resetKey}
        id={id}
        type="email"
        value={value || ""}
        className="email-input"
        placeholder=""
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={!isValid}
        aria-describedby={!isValid ? `${id}-error` : null}
      />
     {(errorMessage) && (
        <div id={`${id}-error`} className="demo-form-feedback">
          { errorMessage }
        </div>
      )}
    </div>
  )

};

export default FieldEmail;
