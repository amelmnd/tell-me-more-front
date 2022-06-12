import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "../../asset/scss/backoffice/answer.scss";
import "../../asset/scss/backoffice/createForm.scss";

import EmptyData from "../../components/EmptyData";
import BlockPictoColor from "../../components/BlockPictoColor";

import { saveAs } from "file-saver";

const FormAnswer = ({ setPage }) => {
  setPage("FormAnswer");

  const { _id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [dataAnswers, setDataAnswers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://amel-mennad-90.herokuapp.com/answers/${_id}`
        );

        setData(response.data);

        /* creation of usable data */
        const middleVarAllData = [];
        const finallyData = [];

        for (let i = 0; i < response.data?.length; i++) {
          const parseElements = JSON.parse(response.data[i].formId.elements);
          parseElements.id = response.data[i]._id;
          middleVarAllData.push(parseElements);
        }

        // answer integration 
        for (let i = 0; i < middleVarAllData?.length; i++) {
          const oneAnswer = middleVarAllData[i];
          for (let j = 0; j < oneAnswer.length; j++) {
            const element = oneAnswer[j];
            const question = oneAnswer[j].question;
            const elementD = response.data[i].answerData;
            element.answer = elementD[question];
          }
          finallyData.push(oneAnswer);
        }
        setDataAnswers(finallyData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [_id]);

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

      event.preventDefault();
      const newDataAnswers = [...dataAnswers];

      for (let i = 0; i < newDataAnswers.length; i++) {
        const element = newDataAnswers[i];
        if (element.id === event.target.id) {
          newDataAnswers.splice(i, 1);
        }
      }
      setDataAnswers(newDataAnswers);
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
