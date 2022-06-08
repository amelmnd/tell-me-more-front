import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../asset/scss/backoffice/homeBackoffice.scss";

// import CreateNewForm from "./CreateNewForm";
// import Form from "./Form";
import FormLinkIcon from "../../components/FormLinkIcon";

const HomeBackoffice = ({ setPage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  setPage("backofficeHome");
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
  ) : (
    <div className="whitePage">
      <div className="boHome">
        <h1 className="boHomeTitle">Formulaires</h1>
        <div className="homeBackofficeContainer">
          <Link to="/backoffice/create">
            <div className="newForm blockForm">
              <span className="icon-plus"></span>
              <span>Nouveau formulaire</span>
            </div>
          </Link>
          {data &&
            data.map((item, index) => {
              return (
                <div className="blockFormExist blockForm " key={item._id}>
                  <div className="formExistFirstLine">
                    <div>
                      <p className="formExistFormulaire">FORULAIRE</p>
                    </div>

                    <FormLinkIcon slug={item.slug} />
                  </div>

                  <h1 className="formExistTitle">{item.title}</h1>

                  {/* <BlockForm /> */}
                  <div className="formExistLastLine">
                    <Link to={`/backoffice/update/${item._id}`}>
                      <span>Editer</span>{" "}
                    </Link>
                    <Link
                      to={`/backoffice/answers/${item._id}`}
                      className="greenButton"
                    >
                      {" "}
                      <span>Voir les réponses</span>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomeBackoffice;
