import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../asset/scss/login.scss";
import "../asset/scss/home.scss";

import Loading from "../components/Loading";
import EmptyData from "../components/EmptyData";
import FormLinkIcon from "../components/FormLinkIcon";
 
const Home = ({ setPage }) => {
  setPage("home");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/forms");

        if (response.data.message !== "Form is empty") {
          setData(response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : !data ? (
    <EmptyData name={"Aucun formulaire"}/>
  ) : (
    <div className="greenPage home">
      <h1>Répondre à un questionnaire</h1>
      {data.map((item, index) => {
        return (
          <div className="blockHomeFormExist blockHomeForm" key={index}>
            <div className="blockFormExistTitle">
              <Link to={`/form/${item.slug}`}>
                <h2>{item.title}</h2>
              </Link>
            </div>

            {/* <BlockForm /> */}
            <div className="blockFormExistButton">
              <FormLinkIcon slug={item.slug} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
