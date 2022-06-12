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
    value,
    setValue,
  } = useField(props);
  const { label, type } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="fieldRadio">
      <div className={value == "1" ? "checked buttonRadio" : "buttonRadio"}>
        <label className="radio-label" htmlFor={1}>
          {1}
        </label>
        <input
          id={1}
          name="radio"
          type="radio"
          className="radio-input"
          value="1"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />{" "}
      </div>{" "}
      <div className={value === "2" ? "checked buttonRadio" : "buttonRadio"}>
        <label className="radio-label" htmlFor={2}>
          {2}
        </label>
        <input
          id={2}
          name="radio"
          type="radio"
          className="radio-input"
          value="2"
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
        />{" "}
      </div>{" "}
      <div className={value === "3" ? "checked buttonRadio" : "buttonRadio"}>
        <label className={"radio-label"} htmlFor={3}>
          {3}
        </label>
        <input
          id={3}
          name="radio"
          type="radio"
          className={"radio-input"}
          value="3"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      <div className={value === "4" ? "checked buttonRadio" : "buttonRadio"}>
        <label className="radio-label" htmlFor={4}>
          {4}
        </label>
        <input
          id={4}
          name="radio"
          type="radio"
          className="radio-input"
          value="4"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />{" "}
      </div>{" "}
      <div className={value === "5" ? "checked buttonRadio" : "buttonRadio"}>
        <label className="radio-label" htmlFor={5}>
          {5}
        </label>
        <input
          id={5}
          name="radio"
          type="radio"
          className="radio-input"
          value="5"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />{" "}
      </div>
    </div>
  );
};

export default FieldRadio;

/*

{dataQuestions.map(({ _id, type, question }, index) => {
              {/* console.log('type', type); *
              const step = `step${index + 1}`;
              const fieldRadio = [];
              if (type === "radio") {
                for (let i = 1; i <= 5; i++) {
                  fieldRadio.push(
                    <FieldRadio name={question} label={i} value={i} />
                  );
                }
              }
*/
