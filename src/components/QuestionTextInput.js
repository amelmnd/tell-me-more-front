import { useState, useRef, useEffect } from "react";
import BlockPictoColor from "./BlockPictoColor";

/* Manage input generate */
const QuestionTextInput = ({
  index,
  type,
  questionValue,
  // setErrorMessage,
  addInput,
  setAddInput,
  inputQuestionsValue,
  setQuestionsValue,
}) => {
  const [inputValue, setInputValue] = useState("");
  console.log("inputQuestionsValue", inputQuestionsValue);

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  const moveUpElement = (event) => {
    event.preventDefault();
    const newInputList = [...addInput];
    const newInputQuestionsValue = [...inputQuestionsValue];
    newInputList.splice(index - 1, 0, newInputList.splice(index, 1)[0]);
    newInputQuestionsValue.splice(
      index - 1,
      0,
      newInputQuestionsValue.splice(index, 1)[0]
    );
    setAddInput(newInputList);
    setQuestionsValue(newInputQuestionsValue);
  };

  const moveDownElement = (event) => {
    event.preventDefault();
    const newInputList = [...addInput];
    const newInputQuestionsValue = [...inputQuestionsValue];
    newInputList.splice(index + 1, 0, newInputList.splice(index, 1)[0]);
    newInputQuestionsValue.splice(
      index + 1,
      0,
      newInputQuestionsValue.splice(index, 1)[0]
    );
    setAddInput(newInputList);
    setQuestionsValue(newInputQuestionsValue);
  };

  const deleteInput = (event) => {
    event.preventDefault();
    const newInputList = [...addInput];
    const newInputQuestionsValue = [...inputQuestionsValue];
    newInputList.splice(index, 1);
    newInputQuestionsValue.splice(index, 1);
    setAddInput(newInputList);
    setQuestionsValue(newInputQuestionsValue);
  };

  const inputQuestionName = (event) => {
    event.preventDefault();
    setInputValue();
    const newQuestion = [...inputQuestionsValue];
    newQuestion[index] = { type: type, question: event.target.value };
    console.log("newQuestion[index]", newQuestion[index]);
    // setErrorMessage("")
    setQuestionsValue(newQuestion);
  };

  console.log("addInput.length ", addInput.length);
  console.log("index + 1", index + 1);
  console.log("inputQuestionsValue", inputQuestionsValue);
  return (
    <section>
      <BlockPictoColor index={index} type={type} />
      <div className="blockInpuText">
        <input
          type="text"
          ref={ref}
          value={
            inputQuestionsValue[index]?.question
              ? inputQuestionsValue[index].question
              : ""
          }
          onChange={inputQuestionName}
        />
      </div>
      <div className="pictoBlockRigth">
        <button
          className={index === 0 && "disabledButton"}
          disabled={index === 0 ? true : false}
          onClick={moveUpElement}
        >
          <span className="icon-chevron-up"></span>
        </button>
        <button
          // className={
          //   index + 1 === addInput.length ? "disabledButton" : "activeButton"
          // }
          disabled={index + 1 === addInput.length ? true : false}
          onClick={moveDownElement}
        >
          <span className="icon-chevron-down"></span>
        </button>
        <button onClick={deleteInput}>
          <span className="icon-trash"></span>
        </button>
      </div>
    </section>
  );
};

export default QuestionTextInput;
