import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../asset/scss/login.scss";

import FormLinkIcon from "../components/FormLinkIcon";
// import Questions from "./User/Questions";
import EmptyForm from "../components/EmptyForm";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/forms");
        console.log("response", response);

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
    <h1>En cours de chargement</h1>
  ) : !data ? (
    <EmptyForm style={"greenPage"}/>
  ) : (
    <div className="greenPage">
      <h1>Répondre à un questionnaire</h1>
      {data.map((item, index) => {
        return (
          <div className="blockHomeFormExist blockHomeForm" key={item._id}>
            <div>
              <Link to={`/form/${item.slug}`}>
                <h1>{item.title}</h1>
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
