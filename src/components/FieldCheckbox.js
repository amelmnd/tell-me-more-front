/* component to yes / no section inside user form*/

import React from "react";
import { useField } from "@formiz/core";

const FieldCheckbox = (props) => {
  const { setValue } = useField(props);
  const { checkedButton, setCheckedButton } = props;

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
