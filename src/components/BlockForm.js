const Form = ({type, question, index, answers, setAnswsers, } ) => {
  // const onChange = (event) => {
  //   event.preventDefault();

  //   const newAnswer = [...answers];
  //   newAnswer[index] = {
  //     question: question,
  //     type: type,
  //     answer: event.target.value,
  //   };
  //   setAnswsers(newAnswer);
  // };
  // if (answers !== []) {
  //   console.log("answers", answers);
  //   /* console.log('answers[index]', answers[index]);
  // console.log('answers[index].answer', answers[index].answer); */
  // }

  // /* if (answers !== [] && answers[index].answer !== undefined){
  // const value = answers[index].answer 
  //  console.log('value', value);
  // } */
  return (
    <>
      <label>{question}</label>
      <input
        type={type}
        name="question"
        // onChange={onChange}
        // value={test}
      />
    </>
  );
}

export default Form;