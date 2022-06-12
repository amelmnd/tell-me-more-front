import React from "react";
import { useField } from "@formiz/core";

const Field = (props) => {
  const {
    isValid,
    isPristine,
    isSubmitted,
    resetKey,
    setValue,
    value,
  } = useField(props);
  const { label, type } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  return (
    <div className="textarea-form">
      <div className="textarea-form">
        <textarea
          rows={5}
          cols={50}
          type="textarea"
          className="textarea"
          placeholder="Répondez ici ..."

          value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        />
      </div>
    </div>
  );
};

export default Field;
