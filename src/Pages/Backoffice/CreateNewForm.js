import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../../asset/scss/backoffice/createForm.scss";

import CustomButtomForm from "../../components/CustomButtomForm";
import QuestionTextInput from "../../components/QuestionTextInput";
import BlockMessage from "../../components/BlockMessage";
import CustomizeForm from "../../components/FormCustomize";


const CreateNewForm = ({ setPage }) => {
  setPage("createNewForm");

  const { component } = useParams();

  const [goodMessage, setGoodMesage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState(""); //OK

  const [addInput, setAddInput] = useState([]); //OK

  const [inputQuestionsValue, setQuestionsValue] = useState([]);
  console.log("inputQuestionsValue", inputQuestionsValue);
  const [typeInput, setTypeInput] = useState("");
  const [question, setQuestion] = useState("");

  /* input focus */
  const ref = useRef(null);
  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  const navigate = useNavigate();

  const onChangeTitle = (event) => {
    setErrorMessage("");
    setTitle(event.target.value);
  };

  const deleteForm = () => {
    setAddInput([]);
    setQuestionsValue([]);
    navigate("/backoffice");
    console.log("deleteForm", "deleteForm");
  };

  const saveNewForm = async (event) => {
    try {
      event.preventDefault();

      if (title.length < 6) {
        setErrorMessage(
          "Votre titre doit contenir au minimum 6 caractères ! 😇"
        );
        throw new Error(
          "Votre titre doit contenir au minimum 6 caractères ! 😇"
        );
      }
      if (inputQuestionsValue.length === 0) {
        setErrorMessage("Votre formulaire doit contenir au moins une question");
        throw new Error("Votre formulaire doit contenir au moins une question");
      }
      if (inputQuestionsValue.length !== addInput.length) {
        setErrorMessage("Votre formulaire doit contenir au moins une question");
        throw new Error("Vos questions ne doivent pas être vides");
      }
      const formData = {
        title,
        question: inputQuestionsValue,
      };

      const response = await axios.post(
        "http://localhost:3200/form/create",
        formData
      );
      setGoodMesage("Votre questionnaire a bien été créé ! 😇");
    } catch (error) {
      setErrorMessage("Votre formulaire est déjà enregistré");
      console.log(error);
    }
  };

  /* form to generate input and new form  */
  return (
    <div className="CreateFormContainer whitePage">
      <form onSubmit={saveNewForm}>
        <div className="headerNewForm">
          <Link to="/backoffice">
            <span className="icon-chevron-left"></span> <span>Formulaire</span>
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
          {component === "questions" ? (
            <div>
              {/* read input generate for button */}
              {addInput &&
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
                      setTypeInput={setTypeInput}
                      setErrorMessage={setErrorMessage}
                    />
                  );
                })}

              {/* create input button */}
              <div className="divButton">
                <CustomButtomForm
                  icon={"icon-file-text"}
                  color={"orangeBlock"}
                  name={"Ajouter une question Texte"}
                  type={"textarea"}
                  addInput={addInput}
                  setAddInput={setAddInput}
                  setErrorMessage={setErrorMessage}
                />
                <CustomButtomForm
                  styles="addInputButton"
                  icon={"icon-star"}
                  color={"pinkBlock"}
                  name={"Ajouter une question Note"}
                  type={"radio"}
                  addInput={addInput}
                  setAddInput={setAddInput}
                  setQuestion={setQuestion}
                  setErrorMessage={setErrorMessage}
                />
                <CustomButtomForm
                  icon={"icon-mail"}
                  color={"blueBlock"}
                  name={"Ajouter une question Email"}
                  type={"email"}
                  addInput={addInput}
                  setAddInput={setAddInput}
                  setErrorMessage={setErrorMessage}
                />
                <CustomButtomForm
                  icon={"icon-question"}
                  color={"greenBlock"}
                  name={"Ajouter une question Oui/Non"}
                  type={"checkbox"}
                  addInput={addInput}
                  setAddInput={setAddInput}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          ) : (
            component === "customizeForm" && <CustomizeForm />
          )}
        </div>
      </form>
      {/* {goodMessage ? (
        <div className="goodMessage">
          <p>{goodMessage}</p>
        </div>
      ) : (
        errorMessage && (
          <div className="errorMessage">
            <p>{errorMessage}</p>
          </div>
        )
      )}
      {goodMessage && (
        <BlockMessage message={goodMessage} styles={goodMessage}/>
      )}
      {errorMessage && <BlockMessage message={errorMessage} styles={errorMessage} />} */}
    </div>
  );
};

export default CreateNewForm;
