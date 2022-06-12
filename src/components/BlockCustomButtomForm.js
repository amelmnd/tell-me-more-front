/* Component contents ALL  button whith creat input inside creat form or update form*/

import CustomButtomForm from "./CustomButtomForm";

const BlockCustomButtomForm = ({addInput, setAddInput}) => {
  return (
    <>
      <CustomButtomForm
        icon={"icon-file-text"}
        color={"orangeBlock"}
        name={"Ajouter une question Texte"}
        type={"textarea"}
        addInput={addInput}
        setAddInput={setAddInput}
      />
      <CustomButtomForm
        styles="addInputButton"
        icon={"icon-star"}
        color={"pinkBlock"}
        name={"Ajouter une question Note"}
        type={"radio"}
        addInput={addInput}
        setAddInput={setAddInput}
      />
      <CustomButtomForm
        icon={"icon-mail"}
        color={"blueBlock"}
        name={"Ajouter une question Email"}
        type={"email"}
        addInput={addInput}
        setAddInput={setAddInput}
      />
      <CustomButtomForm
        icon={"icon-question"}
        color={"greenBlock"}
        name={"Ajouter une question Oui/Non"}
        type={"checkbox"}
        addInput={addInput}
        setAddInput={setAddInput}
      />
    </>
  );
};
 export default BlockCustomButtomForm