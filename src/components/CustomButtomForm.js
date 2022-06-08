const CustomButtomForm = ({
  icon,
  color,
  name,
  type,
  addInput,
  setAddInput,
  inputQuestionsValue,
  setQuestionsValue,
  typeInput,
  setTypeInput,
  question,
  setQuestion,
}) => {
  
  const addToListInput = (event) => {
    event.preventDefault();
    const newInputList = [
      ...addInput,
      { type: type, color: color, icon: icon },
    ];
    setAddInput(newInputList);
  };

  return (
    <button onClick={addToListInput}>
      <p>
        <span className={icon}></span>
        {name}
      </p>
    </button>
  );
};

export default CustomButtomForm;
