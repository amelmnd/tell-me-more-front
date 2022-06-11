import { useState } from "react";

const FormCustomize = ({ picture, setPicture }) => {
  console.log("picture", typeof picture);
  console.log("picture", String(picture));

  // const [picture, setPicture] = useState(null);
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
        <div className="colorBigCircleBlock">
          <div className="color colorBigCircle colorGreen"></div>
          <div className="color colorBigCircle colorBlue"></div>
          <div className="color colorBigCircle colorOrange"></div>
          <div className="color colorBigCircle colorPurple"></div>
        </div>
        <div className="nowColorBlock">
          <p>Couleur du formulaire :</p>
          <div className="color colorLittleCircle"></div>
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
              class="upload-box"
              placeholder="Upload File"
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
