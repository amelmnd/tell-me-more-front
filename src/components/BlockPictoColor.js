/* component to create picto block in crete, update or read form */

const BlockPictoColor = ({ index, type }) => {
  let color;
  let icon;
  switch (type) {
    case "radio":
      color = "pinkBlock";
      icon = "icon-star";
      break;
    case "textarea":
      color = "orangeBlock";
      icon = "icon-file-text";
      break;
    case "checkbox":
      color = "greenBlock";
      icon = "icon-question";
      break;
    case "email":
      color = "blueBlock";
      icon = "icon-mail";
      break;
    default:
      break;
  }
  
  return (
    <div className="pictoBlockLeft">
      <p className={color}>
        {index + 1} - <span className={icon}></span>
      </p>
    </div>
  );
};

export default BlockPictoColor;
