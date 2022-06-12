/* component to manage inpute question input inside create or update */

import {useRef, useEffect } from "react";
import BlockPictoColor from "./BlockPictoColor";

const QuestionTextInput = ({
  index,
  type,
  addInput,
  setAddInput,
  inputQuestionsValue,
  setQuestionsValue,
  setError,
}) => {

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  /* move up question input */
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

  /* move down question input */
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

  /* delete question input */
  const deleteInput = (event) => {
    event.preventDefault();
    const newInputList = [...addInput];
    const newInputQuestionsValue = [...inputQuestionsValue];
    newInputList.splice(index, 1);
    newInputQuestionsValue.splice(index, 1);
    setAddInput(newInputList);
    setQuestionsValue(newInputQuestionsValue);
  };

  /* registrer value input */
  const inputQuestionName = (event) => {
    event.preventDefault();
    setError("");;
    const newQuestion = [...inputQuestionsValue];
    newQuestion[index] = { type: type, question: event.target.value };
    setQuestionsValue(newQuestion);
  };

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
