import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const UpadateForm = () => {
  const { _id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(`http://localhost:3200/form/update/${_id}`);
        console.log("response update", response.data.message);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);



  return <h1>Upadate form { _id }</h1>;
};

export default UpadateForm