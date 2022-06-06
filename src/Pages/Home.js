import { useState } from "react";
import Questions from "./User/Questions";

const Home = () => {
  const [data, setData] = useState(null);

  return data === null ? (
    <div className="container">
      <h1 className="userHomeEmptyTitle">Aucun formulaire disponible ! 😢 </h1>
    </div>
  ) : (
    <div>
      <h1>Home</h1>
      Afficher les formulaires sous forme de block Map : 1 block = 1 formualaire
      <Questions />
    </div>
  );
};

export default Home;
