import { useState, useEffect, useRef } from "react";
import { useField } from "@formiz/core";

const FieldTextarea = (props) => {
  const { setValue, value } = useField(props);

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  return (
    <div className="textarea-form">
      <div className="textarea-form">
        <textarea
          rows={5}
          cols={50}
          ref={ref}
          type="textarea"
          className="textarea"
          placeholder="Répondez ici ..."
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FieldTextarea;
