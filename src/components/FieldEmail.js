import { useState } from "react";
import { useField } from "@formiz/core";
import BlockMessage from "./BlockMessage";

const FieldEmail = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    resetKey,
    setValue,
    value,
  } = useField(props);
  const [isFocused, setIsFocused] = useState(true);

  return (
    <div className="email-form">
      <input
        key={resetKey}
        id={id}
        type="email"
        value={value || ""}
        className="email-input"
        placeholder="Répondez ici ..."
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!isValid}
        aria-describedby={!isValid ? `${id}-error` : null}
      />
      {errorMessage && (
        <BlockMessage message={errorMessage} styles={"errorMessage"}  />
      )}
    </div>
  );
};

export default FieldEmail;