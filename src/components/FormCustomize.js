/* component for cuto inside create or update form*/

import { CirclePicker } from "react-color";

const FormCustomize = ({
  picture,
  setPicture,
  primaryColor,
  setPrimaryColor,
  setSecondaryColor,
  setTextColor,
}) => {
  const handleChangeComplete = (color) => {
    switch (color.hex) {
      case "#79a5dd":
        setPrimaryColor(color.hex);
        setSecondaryColor("#5D92BE");
        setTextColor("#003D6E");
        break;
      case "#ff8138":
        setPrimaryColor(color.hex);
        setSecondaryColor("#F3DDD1");
        setTextColor("#BE4803");
        break;
      case "#b33fd6":
        setPrimaryColor(color.hex);
        setSecondaryColor("#F2E1F7");
        setTextColor("#7F01A5");
        break;

      case "#62c188":
      default:
        setPrimaryColor(color.hex);
        setSecondaryColor("#EAF9EC");
        setTextColor("#0E401C");
        break;
    }
  };

  const onUploadFile = (event) => {
    setPicture(event.target.files[0]);
  };
  const deletePicture = (event) => {
    event.preventDefault();
    setPicture("");
  };

  return (
    <div className="customizeblock">
      <div className="colorCustomizeBlock">
        <h2>Ne permet pas encore la personnalisation du formulaire 😢</h2>
        <CirclePicker
          circleSpacing={15}
          circleSize={100}
          colors={["#62c188", "#79a5dd", "#ff8138", "#b33fd6"]}
          onChangeComplete={handleChangeComplete}
        />
        <div className="nowColorBlock">
          <p>Couleur du formulaire :</p>
          <div
            className="color colorLittleCircle"
            style={{ background: primaryColor }}
          ></div>
        </div>
      </div>
      <div className="imageCustomizeBlock">
        <div
          className="uploadBloack "
          style={{ display: picture ? "none" : "block" }}
        >
          <div className="button-wrapper">
            <span className="label">Ajouter une image</span>
            <span className="icon-plus"></span>

            <input
              type="file"
              name="upload"
              id="upload"
              onChange={onUploadFile}
            />
          </div>
        </div>
        <div
          className="imageBloack"
          style={{ display: picture ? "flex" : "none" }}
        >
          {picture && (
            <img
              src={
                typeof picture === "object"
                  ? URL.createObjectURL(picture)
                  : picture
              }
              alt="votre fichier"
            />
          )}
          <button className="redButton" onClick={deletePicture}>
            Supprimer l'image
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCustomize;
