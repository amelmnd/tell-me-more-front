import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Formiz,
  FormizStep, // Import the FormizStep component
  useForm,
} from "@formiz/core";

import "../../asset/scss/userForm.scss";

import { isEmail } from "@formiz/validations";
import FieldEmail from "../../components/FieldEmail";
import FieldRadio from "../../components/FieldRadio";
import FieldCheckbox from "../../components/FieldCheckbox";
import FieldTextarea from "../../components/FieldTextarea";
import FieldLastStep from "../../components/FieldLastStep";

const UserForm = () => {
  const userForm = useForm();
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [isCreate, setIsCreate] = useState();
  const [dataQuestions, setDataQuestions] = useState();
  // const [checkboxChecked, setChecked] = React.useState("Oui");
  // console.log('values', value);
  const [checkedButton, setCheckedButton] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://amel-mennad-90.herokuapp.com/form-slug/${slug}`
        );
        setData(response.data);
        const parseQuestions = JSON.parse(response.data.elements);
        setDataQuestions(parseQuestions);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      console.log("values", values);
      for (const key in values) {
        if (!values[key]) {
          values[key] = "Pas de réponse";
        }
      }

      const awswerData = {
        formId: data._id,
        answerData: values,
      };

      const response = await axios.post(
        "https://amel-mennad-90.herokuapp.com/answer/create",
        awswerData
      );

      setIsSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading && !data ? (
    <h1>Chargement en cours</h1>
  ) : (
    <>
      <div className="greenPage userForm">
        <Formiz connect={userForm} onSubmit={handleSubmit}>
          <form
            noValidate
            // Change the userForm.submit to userForm.submitStep
            onSubmit={userForm.submitStep}
          >
            <FormizStep name="step0" className=" formStep">
              <h2 className="startSondage">SONDAGE</h2>
              <h1>{data.title}</h1>
              <h2>{dataQuestions.length} Questions</h2>
            </FormizStep>
            {dataQuestions.map(({ _id, type, question }, index) => {
              const step = `step${index + 1}`;

              return (
                <FormizStep
                  key={_id}
                  name={step}
                  placeholder={question}
                  className="formStep"
                >
                  <h2>
                    Question {index + 1} / {dataQuestions.length}
                  </h2>
                  <h1>{question}</h1>
                  {type === "radio" && <FieldRadio name={question} />}
                  {type === "checkbox" && (
                    <div className="switches">
                      <FieldCheckbox
                        name={question}
                        label={question}
                        value={false}
                        checkedButton={checkedButton}
                        setCheckedButton={setCheckedButton}
                      />
                    </div>
                  )}
                  {type == "textarea" && (
                    <FieldTextarea
                      name={question}
                      label={question}
                      type={type}
                    />
                  )}
                  {type === "email" && (
                    <FieldEmail
                      name={question}
                      label={question}
                      type={type}
                      validations={[
                        {
                          rule: isEmail(),
                          message: "Veuillez entrer une adresse email valide.",
                        },
                      ]}
                    />
                  )}
                </FormizStep>
              );
            })}
            {isSubmit && (
              <FormizStep name={`step${dataQuestions.length + 1}`}>
                <div className="lastStep">
                  <h1>Vos réponses ont bien été enregistrées !</h1>
                  <div>
                    <Link to="/" className={"greenButton"}>
                      Retourner à l'accueil
                    </Link>
                  </div>
                </div>
              </FormizStep>
            )}

            {/* Update the submit button to allow navigation between steps. */}
            {userForm.isFirstStep && (
              <button
                type="submit"
                disabled={!userForm.isStepValid}
                className="greenButton"
              >
                Commencer
              </button>
            )}
            <div className="buttonBlock">
              {!userForm.isFirstStep &&
                userForm.currentStep?.index !== dataQuestions.length + 1 && (
                  <>
                    <button
                      className="greenButton prevStep"
                      type="button"
                      onClick={userForm.prevStep}
                    >
                      <span className=" icon-arrow-left"></span>
                      Précédent
                    </button>
                  </>
                )}
              {!userForm.isFirstStep &&
                !userForm.isLastStep &&
                userForm.currentStep?.index !== dataQuestions.length && (
                  <button
                    className="greenButton"
                    type="submit"
                    disabled={!userForm.isStepValid}
                  >
                    Suivant <span className="icon-arrow-right"></span>
                  </button>
                )}
              {userForm.currentStep?.index === dataQuestions.length && (
                <button className="greenButton" type="submit">
                  Soumettre
                </button>
              )}
            </div>
          </form>
        </Formiz>
      </div>
    </>
  );
};

export default UserForm;
