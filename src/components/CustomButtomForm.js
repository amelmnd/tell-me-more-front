const CustomButtomForm = ({
  icon,
  color,
  name,
  type,
  addInput,
  setAddInput,
  // setErrorMessage
}) => {
  const addToListInput = (event) => {
    event.preventDefault();
    const newInputList = [
      ...addInput,
      { type: type, color: color, icon: icon },
    ];
    // setErrorMessage();
    setAddInput(newInputList);
  };

  return (
    <button className="addInputButton" onClick={addToListInput}>
      <p>
        <span className={icon}></span>
        {name}
      </p>
    </button>
  );
};

export default CustomButtomForm;
