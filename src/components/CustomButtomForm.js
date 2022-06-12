/* Component to create  button whith creat input inside creat form or update form*/

const CustomButtomForm = ({
  icon,
  color,
  name,
  type,
  addInput,
  setAddInput,
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
    <button className="addInputButton" onClick={addToListInput}>
      <p>
        <span className={icon}></span>
        {name}
      </p>
    </button>
  );
};

export default CustomButtomForm;
