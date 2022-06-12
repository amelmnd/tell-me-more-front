/**
 * 
* @param {message} str 
* @param {styles} str value : errorMessage / goodMessage 
* @returns  React component.
* 
*/
const BlockMessage = ({ message, styles }) => {
  return  (
    <div className={styles}>
      <p>{message}</p>
    </div>
  ) 
};

export default BlockMessage;
