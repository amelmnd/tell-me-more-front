/* component to email section inside user form*/

import { useField } from "@formiz/core";
import BlockMessage from "./BlockMessage";

const FieldEmail = (props) => {
  const { errorMessage, id, setValue, value } =
    useField(props);

  return (
    <div className="email-form">
      <input
        id={id}
        type="email"
        value={value || ""}
        className="email-input"
        placeholder="Répondez ici ..."
        onChange={(e) => setValue(e.target.value)}
      />
      {errorMessage && (
        <BlockMessage message={errorMessage} styles={"errorMessage"} />
      )}
    </div>
  );
};

export default FieldEmail;
