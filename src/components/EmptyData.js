/*Compote to input data form or answer */

const EmptyData = ({ name }) => {
  return (
    <div className="emptyData">
      <h1 className="userHomeEmptyTitle"> {name} disponible ! 😢 </h1>
    </div>
  );
};

export default EmptyData;
