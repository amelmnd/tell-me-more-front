import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../../asset/scss/backoffice/createForm.scss";

import QuestionTextInput from "../../components/QuestionTextInput";
import BlockMessage from "../../components/BlockMessage";
import FormCustomize from "../../components/FormCustomize";
import BlockCustomButtomForm from "../../components/BlockCustomButtomForm";

const CreateNewForm = ({ setPage }) => {
  setPage("CreateNewForm");

  const { component } = useParams();
  const formData = new FormData();

  const [message, setMesage] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [addInput, setAddInput] = useState([]);
  const [inputQuestionsValue, setQuestionsValue] = useState([]);

  const [picture, setPicture] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#62c188");
  const [secondaryColor, setSecondaryColor] = useState("#EAF9EC");
  const [textColor, setTextColor] = useState("#0E401C");

  const ref = useRef(null);
  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  const navigate = useNavigate();

  const onChangeTitle = (event) => {
    setError("");
    setTitle(event.target.value);
  };

  const deleteForm = () => {
    setAddInput([]);
    setQuestionsValue([]);
    navigate("/backoffice");
  };

  const saveNewForm = async (event) => {
    try {
      event.preventDefault();

      if (title.length < 6) {
        setError("Votre titre doit contenir au minimum 6 caractères ! 😇");
        throw new Error(
          "Votre titre doit contenir au minimum 6 caractères ! 😇"
        );
      }

      if (inputQuestionsValue.length === 0) {
        setError("Votre formulaire doit contenir au moins une question");
        throw new Error("Votre formulaire doit contenir au moins une question");
      } else {
        for (let i = 0; i < inputQuestionsValue.length; i++) {
          const question = inputQuestionsValue[i].question;
          if (question === "") {
            setError("Vos questions ne doivent pas être vides");
            throw new Error("Vos questions ne doivent pas être vides");
          }
        }
      }

      if (inputQuestionsValue.length !== addInput.length) {
        setError("Votre formulaire doit contenir au moins une question");
        throw new Error("Vos questions ne doivent pas être vides");
      }

      const color = {
        primary: primaryColor,
        secondary: secondaryColor,
        text: textColor,
      };


      formData.append("title", title);
      formData.append("picture", picture);
      formData.append("question", JSON.stringify(inputQuestionsValue));

      formData.append("color", JSON.stringify(color))

      await axios.post(
        "https://amel-mennad-90.herokuapp.com/form/create",
        formData
      );
      setMesage("Votre questionnaire a bien été créé ! 😇");
    } catch (error) {
      console.log(error);
    }
  };

  /* form to generate input and new form  */
  return (
    <div className="CreateFormContainer whitePage">
      <form onSubmit={saveNewForm}>
        {/* start navigation*/}
        <div className="headerNewForm">
          <Link to="/backoffice">
            <span className="icon-chevron-left"></span>
            <span>Formulaire</span>
          </Link>
          <input
            type="text"
            name="title"
            value={title}
            id="title"
            ref={ref}
            placeholder="Veuillez renseigner un nom de formulaire"
            onChange={onChangeTitle}
          />
          <div>
            <input
              className="redButton"
              type="reset"
              name="Supprimer"
              id="Supprimer"
              onClick={deleteForm}
              value="Supprimer"
            />
            <input className="greenButton" type="submit" name="Sauvgarder" />
          </div>
        </div>
        <div className="content ">
          <div className="divTitle">
            <h2>
              <Link to="/backoffice/create/questions">Questions</Link>
            </h2>

            <h2>
              <Link to="/backoffice/create/customizeForm">
                Personnaliser le formulaire
              </Link>
            </h2>
          </div>
          {/* end navigation*/}

          {component === "questions" ? (
            <div>
              {/* read input generate for button */}
              {addInput.length > 0 &&
                addInput.map(({ type, color, icon }, index) => {
                  return (
                    <QuestionTextInput
                      index={index}
                      icon={icon}
                      color={color}
                      type={type}
                      addInput={addInput}
                      setAddInput={setAddInput}
                      inputQuestionsValue={inputQuestionsValue}
                      setQuestionsValue={setQuestionsValue}
                      setError={setError}
                    />
                  );
                })}

              {/* create input button */}
              <div className="divButton">
                <BlockCustomButtomForm
                  addInput={addInput}
                  setAddInput={setAddInput}
                />
              </div>
            </div>
          ) : (
            component === "customizeForm" && (
              <FormCustomize
                picture={picture}
                primaryColor={primaryColor}
                setPicture={setPicture}
                setPrimaryColor={setPrimaryColor}
                setSecondaryColor={setSecondaryColor}
                setTextColor={setTextColor}
              />
            )
          )}
        </div>
      </form>
      {message && <BlockMessage message={message} styles={"successe"} />}
      {error && <BlockMessage message={error} styles={"errorMessage"} />}
    </div>
  );
};

export default CreateNewForm;
