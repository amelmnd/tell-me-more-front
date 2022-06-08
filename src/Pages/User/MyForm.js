import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Formiz,
  FormizStep, // Import the FormizStep component
  useForm,
} from "@formiz/core";
import { isEmail } from "@formiz/validations";
import Field from "./Field";
import FieldRadio from "../../components/FieldRadio";
import FieldCheckbox from "../../components/FieldCheckbox";

const MyForm = () => {
  const myForm = useForm();
  const { slug } = useParams();

  // const slug = "questionnaire";

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [isCreate, setIsCreate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3200/form/${slug}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

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

      const response = await axios.post(
        "http://localhost:3200/answer/create",
        awswerData
      );
    
      setIsCreate(true);

      // console.log("awswerData", awswerData);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading && !data ? (
    <h1>Chargement en cours</h1>
  ) : (
    <Formiz
      connect={myForm}
      onSubmit={handleSubmit}
    >
      <form
        // Change the myForm.submit to myForm.submitStep
        onSubmit={myForm.submitStep}
      >
        <FormizStep name="step0">
          <h1>{data.title}</h1>
          <h2>{data.elements.length} Questions</h2>
        </FormizStep>
        {data.elements.map(({ _id, type, question }, index) => {
          const step = `step${index + 1}`;
          const fieldRadio = [];
          if (type === "radio") {
            for (let i = 1; i <= 5; i++) {
              fieldRadio.push(<FieldRadio name={question} label={i} value={i} />);
            }
          }

          return (
            <FormizStep key={_id} name={step} placeholder={question}>
              <h2>
                Question {index + 1} / {data.elements.length}
              </h2>
              <h1>{question}</h1>
              {type === "radio" ? (
                fieldRadio
              ) : type === "checkbox" ? (
                <FieldCheckbox name={question} value={false} />
              ) : (
                <Field name={question} type={type} />
              )}
            </FormizStep>
          );
        })}

        {/* <FormizStep name={`step${data.elements.length + 1}`}>
          <h1>Merci de votre participation</h1>
        </FormizStep> */}

        {/* Update the submit button to allow navigation between steps. */}
        {myForm.isFirstStep && (
          <button type="submit" disabled={!myForm.isStepValid}>
            Commencer
          </button>
        )}
        {!myForm.isFirstStep && !myForm.isLastStep && (
          <>
            <button type="button" onClick={myForm.prevStep}>
              Précédent
            </button>
          </>
        )}
        {!myForm.isFirstStep &&
          !myForm.isLastStep &&
          myForm.currentStep?.index !== data.elements.length && (
            <button type="submit" disabled={!myForm.isStepValid}>
              Suivant
            </button>
          )}
        {myForm.currentStep?.index === data.elements.length && (
          <button type="submit">Soumettre</button>
        )}
      </form>
    </Formiz>
  );
};

export default MyForm;
