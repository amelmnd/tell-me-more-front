/**
 * Component to creer sucess or error message
 * @param {message} str
 * @param {styles} str value : errorMessage / successe
 * @returns  React component.
 *
 */

const BlockMessage = ({ message, styles }) => {
  return (
    <div className={styles}>
      <p>{message}</p>
    </div>
  );
};

export default BlockMessage;
