import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

import "../../asset/scss/backoffice/createForm.scss";

import CustomButtomForm from "../../components/CustomButtomForm";
import QuestionTextInput from "../../components/QuestionTextInput";

const CreateNewForm = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [title, setTitle] = useState(""); //OK

  const [addInput, setAddInput] = useState([]); //OK
  const [inputQuestionsValue, setQuestionsValue] = useState([]);
  console.log("inputQuestionsValue", inputQuestionsValue);
  const [typeInput, setTypeInput] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const onChangeTitle = (event) => {
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
      const formData = {
        title,
        question: inputQuestionsValue,
      };
      const response = await axios.post(
        "http://localhost:3200/backoffice/create",
        formData
      );
      console.log(response.data)
      setIsLoading(false);

      console.log("formData", formData);
    } catch (error) {}
  };

  return (
    <div className="CreateFormContainer">
      {/* formulaire permettant la création des data d'un nouveau formulaire  */}
      <form onSubmit={saveNewForm}>
        <div className="header">
          <Link to="/backoffice">Formulaire</Link>
          <input
            type="text"
            name="title"
            value={title}
            id="title"
            placeholder="Veuillez renseigner un nom de formulaire"
            onChange={onChangeTitle}
          />
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
        <div className="content">
          <div className="divTitle">
            <h1>Questions</h1>
            <h1>Personnaliser le formulaire</h1>
          </div>

          {/* permet d'afficher les imputs créeer grace au bouton  */}
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
                />
              );
            })}

          {/* Bouton permettant de créer les imput */}
          <div className="divButton">
            <CustomButtomForm
              className="button"
              icon={"icon-file-text"}
              color={"orangeBlock"}
              name={"Ajouter une question Texte"}
              type={"text"}
              addInput={addInput}
              setAddInput={setAddInput}
              inputQuestionsValue={inputQuestionsValue}
              setQuestionsValue={setQuestionsValue}
              typeInput={typeInput}
              setTypeInput={setTypeInput}
              question={question}
              setQuestion={setQuestion}
            />
            <CustomButtomForm
              icon={"icon-star"}
              color={"pinkBlock"}
              name={"Ajouter une question Note"}
              type={"textarea"}
              addInput={addInput}
              setAddInput={setAddInput}
              inputQuestionsValue={inputQuestionsValue}
              setQuestionsValue={setQuestionsValue}
            />
            <CustomButtomForm
              icon={"icon-mail"}
              color={"blueBlock"}
              name={"Ajouter une question Email"}
              type={"email"}
              addInput={addInput}
              setAddInput={setAddInput}
              inputQuestionsValue={inputQuestionsValue}
              setQuestionsValue={setQuestionsValue}
            />
            <CustomButtomForm
              icon={"icon-question"}
              color={"greenBlock"}
              name={"Ajouter une question Oui/Non"}
              type={"checkbox"}
              addInput={addInput}
              setAddInput={setAddInput}
              inputQuestionsValue={inputQuestionsValue}
              setQuestionsValue={setQuestionsValue}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewForm;
