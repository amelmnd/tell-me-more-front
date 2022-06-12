import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "../../asset/scss/backoffice/createForm.scss";

import "../../asset/scss/backoffice/createForm.scss";

import CustomButtomForm from "../../components/CustomButtomForm";
import QuestionTextInput from "../../components/QuestionTextInput";
import CustomizeForm from "../../components/FormCustomize";
import BlockMessage from "../../components/BlockMessage";

const UpadateForm = ({ setPage }) => {
  setPage("UpadateForm");

  const { _id, component } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const [message, setMesage] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const [addInput, setAddInput] = useState([]);
  // console.log("addInput", addInput);
  const [inputQuestionsValue, setQuestionsValue] = useState([]);
  // console.log("inputQuestionsValue", inputQuestionsValue);
  const [typeInput, setTypeInput] = useState("");
  const [question, setQuestion] = useState("");
  const [picture, setPicture] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://amel-mennad-90.herokuapp.com/form/${_id}`
        );

        const parseQuestionsValues = JSON.parse(response.data.elements);
        console.log("parseQuestionsValues", parseQuestionsValues);
        setQuestionsValue(parseQuestionsValues);
        setIsLoading(false);
        setTitle(response.data.title);
        console.log("response.data?.picture", response.data?.picture);
        if (response.data?.picture) {
          setPicture(response.data.picture);
        }

        for (let index = 0; index < parseQuestionsValues.length; index++) {
          const element = parseQuestionsValues[index];
          // console.log("element", element);
          let color;
          let icon;
          switch (element.type) {
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

          element.icon = icon;
          element.color = color;
        }
        setAddInput(parseQuestionsValues);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  /* input focus */
  const ref = useRef(null);
  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  const onChangeTitle = (event) => {
    setError("");
    setTitle(event.target.value);
  };

  const formData = new FormData();
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

      /* clean data before send */
      for (let index = 0; index < inputQuestionsValue.length; index++) {
        delete inputQuestionsValue[index]["icon"];
        delete inputQuestionsValue[index]["color"];
      }

      formData.append("title", title);
      formData.append("picture", picture);
      formData.append("question", JSON.stringify(inputQuestionsValue));

      // console.log("formData", formData);
      const response = await axios.put(
        `https://amel-mennad-90.herokuapp.com/form/update/${_id}`,
        formData
      );
      setMesage("Votre questionnaire a bien été mis à jours ! 😇");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteForm = async (event) => {
    try {
      event.preventDefault();
      await axios.delete(
        `https://amel-mennad-90.herokuapp.com/form/delete/${_id}`
      );
      setAddInput([]);
      setQuestionsValue([]);
      setIsDelete(true);
      navigate("/backoffice");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <h1>En cours de chargement</h1>
  ) : (
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
              <Link to={`/backoffice/update/questions/${_id}`}>Questions</Link>
            </h2>

            <h2>
              <Link to={`/backoffice/update/customizeForm/${_id}`}>
                Personnaliser le formulaire
              </Link>
            </h2>
          </div>
          {component === "questions" ? (
            <>
              {addInput &&
                addInput.map(({ type, question }, index) => {
                  return (
                    <QuestionTextInput
                      index={index}
                      type={type}
                      questionValue={question}
                      addInput={addInput}
                      setAddInput={setAddInput}
                      inputQuestionsValue={inputQuestionsValue}
                      setQuestionsValue={setQuestionsValue}
                      setTypeInput={setTypeInput}
                      setError={setError}
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
                  setError={setError}
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
                  setError={setError}
                />
                <CustomButtomForm
                  icon={"icon-mail"}
                  color={"blueBlock"}
                  name={"Ajouter une question Email"}
                  type={"email"}
                  addInput={addInput}
                  setAddInput={setAddInput}
                  setError={setError}
                />
                <CustomButtomForm
                  icon={"icon-question"}
                  color={"greenBlock"}
                  name={"Ajouter une question Oui/Non"}
                  type={"checkbox"}
                  addInput={addInput}
                  setAddInput={setAddInput}
                  setError={setError}
                />
              </div>
            </>
          ) : (
            component === "customizeForm" && (
              <CustomizeForm picture={picture} setPicture={setPicture} />
            )
          )}
        </div>
      </form>
      {message && <BlockMessage message={message} styles={"goodMessage"} />}
      {error && <BlockMessage message={error} styles={"errorMessage"} />}
    </div>
  );
};

export default UpadateForm;
