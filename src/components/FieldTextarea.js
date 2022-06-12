/* component to text section inside user form*/

import { useField } from "@formiz/core";

const FieldTextarea = (props) => {
  const { setValue, value } = useField(props);

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
        />
      </div>
    </div>
  );
};

export default FieldTextarea;
