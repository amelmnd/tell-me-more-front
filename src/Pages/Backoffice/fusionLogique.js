import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import EmptyData from "../../components/EmptyData";

import "../../asset/scss/backoffice/createForm.scss";

const FormAnswer = () => {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3200/answers/${_id}`
        );
        // console.log("response", response.data);

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const click = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target.id);
  };

  const deleteAnswer = async (event) => {
    try {
      event.preventDefault();

      await axios.delete(
        `http://localhost:3200/answer/delete/${event.target.id}`
      );
      setIsDelete(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAllAnswer = async (event) => {
    try {
      event.preventDefault();

      await axios.delete(
        `http://localhost:3200/answers/delete/${event.target.id}`
      );

      navigate("/backoffice");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <h1>En cours de chargement</h1>
  ) : data.length === 0 ? (
    <EmptyData name={"Aucune réponse"} />
  ) : (
    <>
      <div className="CreateFormContainer">
        <div className="header">
          <Link to="/backoffice">Formulaire</Link>
          <button className="redButton" onClick={deleteAllAnswer} id={_id}>
            Supprimer toutes les réponses
          </button>
          <button className="greenButton" onClick={click}>
            Exporter en CSV
          </button>
        </div>
        <div className="content">
          {data.map((itemData, index) => {
            return (
              <div key={index}>
                <h1>{itemData.formId.title} </h1>
                {itemData.formId.elements.map((itemElement, index) => {
                  return (
                    <div>
                      <p>{itemElement.type}</p>
                      <h2>{itemElement.question}</h2>
                      <p>{itemData.answerData[itemElement.question]}</p>
                    </div>
                  );
                })}
                <p>
                  {index + 1}/{data.length}
                </p>
                <button
                  className="redButton"
                  onClick={deleteAnswer}
                  id={itemData._id}
                >
                  Supprimer la réponse
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FormAnswer;

/*
******************************************************************

fonctionnne a recupérer si test d'intégrer les maps dans le return echoue

******************************************************************
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "../../asset/scss/backoffice/createForm.scss";

const FormAnswer = () => {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3200/answers/${_id}`
        );
        console.log("response", response.data);

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [_id]);

  const click = (event) => {
    event.preventDefault();
  };
  // const navigate = useNavigate();

  const formAnswerData = [];
  let title = "";
  console.log('data', data);
  // eslint-disable-next-line array-callback-return
  data?.map((itemData, index) => {

    title = itemData.formId.title;

    const nemo = []
    itemData.formId.elements.map((itemElement, index) => {
      const questionAllData = {};
      questionAllData.index = index
      // console.log('questionAllData', questionAllData);
      questionAllData.type = itemElement.type;
      questionAllData.question = itemElement.question;
      questionAllData.answer = itemData.answerData[itemElement.question];
      const renderarray = (<div>
        <p>{itemElement.type}</p>
        <h2>{itemElement.question}</h2>
        <p>{itemData.answerData[itemElement.question]}</p>
      </div>)
      nemo.push(renderarray);
    });
    formAnswerData.push(nemo);
  });
  console.log("formAnswerData", formAnswerData);

  return isLoading ? (
    <h1>En cours de chargement</h1>
  ) : data.length === 0 ? (
    <div>
      <h1 className="userHomeEmptyTitle">Aucun réponse disponible ! 😢 </h1>
    </div>
  ) : (
    <>
      <div className="CreateFormContainer">
        <div className="header">
          <Link to="/backoffice">Formulaire</Link>
          <button className="redButton" onClick={click} id={data.formId._id}>
            Supprimer toutes les réponses
          </button>
          <button className="greenButton" onClick={click}>
            Exporter en CSV
          </button>
        </div>
        <div className="content">
          {formAnswerData.map(({ answer, type, question }, index) => {
            const countAnswers = data.length;
            console.log("countAnswers", countAnswers);
            return (
              <div key={index}>
              <h1>{title} </h1>
              {formAnswerData[index]}
                <p>
                  {index + 1 }/{countAnswers}
                </p>
                <button className="redButton" onClick={click} id={data._id}>
                  Supprimer la réponse
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FormAnswer;

*/
