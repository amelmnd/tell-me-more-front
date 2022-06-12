import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "../../asset/scss/backoffice/createForm.scss";
import "../../asset/scss/backoffice/createForm.scss";

import QuestionTextInput from "../../components/QuestionTextInput";
import FormCustomize from "../../components/FormCustomize";
import BlockMessage from "../../components/BlockMessage";
import BlockCustomButtomForm from "../../components/BlockCustomButtomForm";

const UpadateForm = ({ setPage }) => {
  setPage("UpadateForm");

  const { _id, component } = useParams();
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMesage] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [addInput, setAddInput] = useState([]);
  const [inputQuestionsValue, setQuestionsValue] = useState([]);
  const [picture, setPicture] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#62c188");
  const [secondaryColor, setSecondaryColor] = useState("#EAF9EC");
  const [textColor, setTextColor] = useState("#0E401C");

  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);
  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://amel-mennad-90.herokuapp.com/form/${_id}`
        );

        /* creation of usable data */
        const parseQuestionsValues = JSON.parse(response.data.elements);
        setQuestionsValue(parseQuestionsValues);

        setTitle(response.data.title);
        if (response.data?.picture) {
          setPicture(response.data.picture);
        }

        for (let index = 0; index < parseQuestionsValues.length; index++) {
          const element = parseQuestionsValues[index];
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onChangeTitle = (event) => {
    setError("");
    setTitle(event.target.value);
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

      /* clean data before send */
      for (let index = 0; index < inputQuestionsValue.length; index++) {
        delete inputQuestionsValue[index]["icon"];
        delete inputQuestionsValue[index]["color"];
      }

      formData.append("title", title);
      formData.append("picture", picture);
      formData.append("question", JSON.stringify(inputQuestionsValue));

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
        {/* start navigation*/}
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
            <input
              className="greenButton"
              type="submit"
              name="Sauvgarder"
              value="Sauvgarder"
            />
          </div>
        </div>
        <div className="content ">
          <div className="divTitle">
            <h2>
              <Link to={`/backoffice/update/questions/${_id}`}>Questions</Link>
            </h2>
            <h2>
              <Link to={`/backoffice/update/FormCustomize/${_id}`}>
                Personnaliser le formulaire
              </Link>
            </h2>
          </div>
          {/* end navigation*/}

          {component === "questions" ? (
            <>
              {addInput &&
                addInput.map(({ type, question }, index) => {
                  return (
                    <QuestionTextInput
                      index={index}
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
            </>
          ) : (
            component === "FormCustomize" && (
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

export default UpadateForm;
