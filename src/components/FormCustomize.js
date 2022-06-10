const FormCustomize = () => {
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
          <div className="color colorLittleCircle"></div>{" "}
        </div>
      </div>
      <div className="imageCustomizeBlock">
        <div class="button-wrapper">
          <span class="label">Ajouter une image</span>
          <span className="icon-plus"></span>

          <input
            type="file"
            name="upload"
            id="upload"
            class="upload-box"
            placeholder="Upload File"
          />
        </div>
      </div>
    </div>
  );
};

export default FormCustomize;
