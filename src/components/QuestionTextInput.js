import { useState } from "react";

const QuestionTextInput = ({
  index,
  icon,
  type,
  color,
  addInput,
  setAddInput,
  inputQuestionsValue,
  setQuestionsValue,

}) => {
  const [inputValue, setInputValue] = useState("");

  const moveUpElement = (event) => {
    event.preventDefault();
    event.preventDefault();
    const newInputList = [...addInput];
    const newInputQuestionsValue = [...inputQuestionsValue];
    newInputList.splice(index - 1, 0, newInputList.splice(index, 1)[0]);
    newInputQuestionsValue.splice(
      index - 1,
      0,
      newInputQuestionsValue.splice(index, 1)[0]
    );
    console.log(newInputQuestionsValue); // 👉️ ['js', 'ts', 'css']
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
    console.log(newInputQuestionsValue); // 👉️ ['js', 'ts', 'css']
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
    setQuestionsValue(newQuestion);
  };

  console.log('inputQuestionsValue', inputQuestionsValue);
  // const valueQuestion = inputQuestionsValue[index].question ? inputQuestionsValue[index].question : ""
  return (
    <section>
      <div className="pictoBlockLeft">
        <p className={color}>
          {index} - <span className={icon}></span>
        </p>
      </div>
      <div className="blockInpuText">
        <input
          type="text"
          onChange={inputQuestionName}
        />
      </div>
      <div className="pictoBlockRigth">
        <button onClick={moveUpElement}>
          <span className="icon-chevron-up"></span>
        </button>
        <button onClick={moveDownElement}>
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
