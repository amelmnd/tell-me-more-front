import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../asset/scss/backoffice/createForm.scss";

import CustomButtomForm from "../../components/CustomButtomForm";
import QuestionTextInput from "../../components/QuestionTextInput";

const CreateNewForm = ({ setPage }) => {
  setPage("updateForm");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/forms");
        setData(response.data);

        console.log("response", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  setPage("createNewForm");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const [addInput, setAddInput] = useState([]);
  console.log("addInput", addInput);
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
    setError("");
    setTitle(event.target.value);
  };

  const deleteForm = () => {
    setAddInput([]);
    setQuestionsValue([]);
    navigate("/backoffice");
    console.log("deleteForm", "deleteForm");
  };

  const saveNewForm = async (event) => {
    //   try {
    //     event.preventDefault();
    //     if (title.length > 6) {
    //       setError("Votre titre doit contenir au minimum 6 caractères ! 😇");
    //       throw new Error(
    //         "Votre titre doit contenir au minimum 6 caractères ! 😇"
    //       );
    //     }
    //     if (inputQuestionsValue.length === 0) {
    //       setError("Votre formulaire doit contenir au moins une question");
    //       throw new Error("Votre formulaire doit contenir au moins une question");
    //     }
    //     if (inputQuestionsValue.length !== addInput.length) {
    //       setError("Votre formulaire doit contenir au moins une question");
    //       throw new Error("Vos questions ne doivent pas être vides");
    //     }
    //     const formData = {
    //       title,
    //       question: inputQuestionsValue,
    //     };
    //     const response = await axios.post(
    //       "http://localhost:3200/form/create",
    //       formData
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
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
            <h2>Questions</h2>

            <h2>
              <Link to="/">Personnaliser le formulaire</Link>
            </h2>
          </div>

          {/* read input generate for button */}
          {data &&
            data.map(({ type, color, icon }, index) => {
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
        </div>
      </form>
      {error && (
        <div className="errorMesage">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateNewForm;
