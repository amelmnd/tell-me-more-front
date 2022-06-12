import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import EmptyData from "../../components/EmptyData";

import "../../asset/scss/backoffice/createForm.scss";
import BlockPictoColor from "../../components/BlockPictoColor";

import "../../asset/scss/backoffice/answer.scss";

import { saveAs } from "file-saver";

const FormAnswer = () => {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  console.log("data", data);
  const [isDelete, setIsDelete] = useState(false);
  const [isLastOne, setIsLastOne] = useState(false);
  const [dataAnswers, setDataAnswers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://amel-mennad-90.herokuapp.com/answers/${_id}`
        );

        setData(response.data);

        const middleVarAllData = [];
        const finallyData = [];

        for (let i = 0; i < response.data?.length; i++) {
          const parseElements = JSON.parse(response.data[i].formId.elements);
          parseElements.id = response.data[i]._id;
          middleVarAllData.push(parseElements);
        }

        // on intégre les réponses
        for (let i = 0; i < middleVarAllData?.length; i++) {
          const oneAnswer = middleVarAllData[i];
          for (let j = 0; j < oneAnswer.length; j++) {
            //la ou on veut ajouter la data questions type
            const element = oneAnswer[j];
            const question = oneAnswer[j].question;
            //la ou se trouve la reponse
            const elementD = response.data[i].answerData;
            element.answer = elementD[question];
          }
          finallyData.push(oneAnswer);
        }
        setDataAnswers(finallyData);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  // const downloadCsv = async (event) => {
  //   try {
  //     event.preventDefault();
  //     await axios.get(`https://amel-mennad-90.herokuapp.com/answers/dowloadCsv/${_id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const downloadCsv = () => {
    const date = Date.now();

    saveAs(
      `https://amel-mennad-90.herokuapp.com/answers/dowloadCsv/${_id}`,
      `answer-${data[0].formId.slug}-${date}.csv`
    );
  };

  const deleteOneAnswer = async (event) => {
    try {
      event.preventDefault();

      await axios.delete(
        `https://amel-mennad-90.herokuapp.com/answer/delete/${event.target.id}`
      );
      console.log("event.target.id", event.target.id);
      // dataAnswers

      event.preventDefault();
      const newDataAnswers = [...dataAnswers];

      for (let i = 0; i < newDataAnswers.length; i++) {
        const element = newDataAnswers[i];
        if (element.id === event.target.id) {
          newDataAnswers.splice(i, 1);
        }
      }
      setDataAnswers(newDataAnswers);
      setIsDelete(true);
      if (dataAnswers.length === 1) {
        navigate("/backoffice");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllAnswer = async (event) => {
    try {
      event.preventDefault();

      await axios.delete(
        `https://amel-mennad-90.herokuapp.com/answers/delete/${event.target.id}`
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
      <div className="answersFormContainer">
        <div className="headerAnswer">
          <Link to="/backoffice">
            <span className="icon-chevron-left"></span> <span>Formulaire</span>
          </Link>

          <div>
            <button className="redButton" onClick={deleteAllAnswer} id={_id}>
              Supprimer toutes les réponses
            </button>

            <button className="greenButton" onClick={downloadCsv}>
              Exporter en CSV
            </button>
          </div>
        </div>
        <div className="content greenPage">
          <div className="answersTitle">
            <h1>{data[0].formId.title} </h1>
          </div>
          {dataAnswers.map((itemData, indexData) => {
            console.log("itemData", itemData);
            return (
              <div key={indexData} className="answerBlock">
                {itemData.map((itemElement, index) => {
                  return (
                    <div className="answersDatas">
                      <BlockPictoColor type={itemElement.type} index={index} />
                      <div className="answersQuestions">
                        <h2>{itemElement.question}</h2>

                        {itemElement.type === "radio" ? (
                          <div className="answerRadioType">
                            <div
                              className={
                                itemElement.answer === "1" && "elementActive"
                              }
                            >
                              <p>1</p>
                            </div>
                            <div
                              className={
                                itemElement.answer === "2" && "elementActive"
                              }
                            >
                              <p>2</p>
                            </div>
                            <div
                              className={
                                itemElement.answer === "3" && "elementActive"
                              }
                            >
                              <p>3</p>
                            </div>
                            <div
                              className={
                                itemElement.answer === "4" && "elementActive"
                              }
                            >
                              <p>4</p>
                            </div>
                            <div
                              className={
                                itemElement.answer === "5" && "elementActive"
                              }
                            >
                              <p>5</p>
                            </div>
                          </div>
                        ) : (
                          <p>{itemElement.answer}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="answerFooter">
                  <p>
                    {indexData + 1}/{dataAnswers.length}
                  </p>
                  <button
                    className="redButton"
                    onClick={deleteOneAnswer}
                    id={itemData.id}
                  >
                    Supprimer la réponse
                  </button>
                </div>
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
          `https://amel-mennad-90.herokuapp.com/answers/${_id}`
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
