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

  const { label, type, required, checkedButton, setCheckedButton } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  return (
    <div className="checkbox-yes-no">
      <div className="yesNoButton">
        <div
          onClick={(event) => {
            setCheckedButton(true);
            setValue("Oui");
          }}
          className={checkedButton ? "checked" : "noChecked"}
          value="Oui"
        >
          OUI
        </div>
        <div
          onClick={(event) => {
            setCheckedButton(false);
            setValue("Non");
          }}
          className={checkedButton ? "noChecked" : "checked"}
          value="Non"
        >
          NON
        </div>
      </div>
    </div>
  );
};

export default FieldCheckbox;
