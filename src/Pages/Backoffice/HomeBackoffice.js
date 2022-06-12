import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "../../asset/scss/backoffice/homeBackoffice.scss";

import Loading from "../../components/Loading";

import FormLinkIcon from "../../components/FormLinkIcon";

const HomeBackoffice = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://amel-mennad-90.herokuapp.com/forms");
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
  ) : (
    <section className="whitePage bo">
      <div className="boHome">
        <h1 className="boHomeTitle">Formulaires</h1>
        <div className="homeBackofficeContainer">
          <Link to="/backoffice/create/questions">
            <div className="newForm blockForm">
              <span className="icon-plus"></span>
              <span>Nouveau formulaire</span>
            </div>
          </Link>
          {data &&
            data.map((item, index) => {
              console.log('item', item._id);
              
              return (
                <div className="blockFormExist blockForm " key={index}>
                  <div className="formExistFirstLine">
                    <div>
                      <p>FORMULAIRE</p>
                    </div>

                    <FormLinkIcon slug={item.slug} target={"_blank"} />
                  </div>
                  <div className="formExistTitle">
                    <h1>
                      {item.title.length > 50
                        ? item.title.substring(1, 50) + " ..."
                        : item.title}
                    </h1>
                  </div>

                  {/* <BlockForm /> */}
                  <div className="formExistLastLine">
                    <Link to={`/backoffice/update/questions/${item._id}`}>
                      <span>Editer</span>
                    </Link>
                    <Link
                      to={`/backoffice/answers/${item._id}`}
                      className="greenButton"
                    >
                      <span>Voir les réponses</span>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HomeBackoffice;
