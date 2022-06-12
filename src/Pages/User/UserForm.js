/**
 * It takes in a message and a styles prop, and returns a div with a p tag inside of it
 * @returns A React component.
 */
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Import Formiz methode
import { Formiz, FormizStep, useForm } from "@formiz/core";

import "../../asset/scss/userForm.scss";

import { isEmail } from "@formiz/validations";
import FieldEmail from "../../components/FieldEmail";
import FieldRadio from "../../components/FieldRadio";
import FieldCheckbox from "../../components/FieldCheckbox";
import FieldTextarea from "../../components/FieldTextarea";
import BlockMessage from "../../components/BlockMessage";

const UserForm = () => {
  const userForm = useForm();
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [dataQuestions, setDataQuestions] = useState();
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
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async (values) => {
    try {
      for (const key in values) {
        if (!values[key]) {
          values[key] = "Pas de réponse";
        }
      }

      const awswerData = {
        formId: data._id,
        answerData: values,
      };

      await axios.post(
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
            onSubmit={userForm.submitStep}
          >
            <FormizStep name="step0" className=" formStep firstStep">
              <div className="firstStepText">
                <h2 className="startSondage">SONDAGE</h2>
                <h1>{data.title}</h1>
                <h2>{dataQuestions.length} Questions</h2>
              </div>
              {data.picture && (
                <div className="firstStepImage">
                  <img src={data.picture} alt={data.title} />
                </div>
              )}
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
                  {type === "textarea" && (
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
                  <div className="lastStepbutton">
                    <Link
                      to={`/form/${data.slug}`}
                      target="_blanck"
                      className={"greenButton"}
                    >
                      Recommencer
                    </Link>
                    <Link to="/" className={"greenButton"}>
                      Retourner à l'accueil
                    </Link>
                  </div>
                  <BlockMessage
                    message={"Votre réponse a bien été enregistrée"}
                    styles={"successe"}
                  />
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
