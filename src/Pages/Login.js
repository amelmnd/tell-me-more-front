import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../asset/scss/login.scss";
import BlockMessage from "../components/BlockMessage";

const Login = ({ setAdminCookie, setPage }) => {
  setPage("Login");

  const [password, setPassword] = useState("admin");
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPasswordError(false);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === "admin") {
      setAdminCookie(true);
      navigate("/backoffice");
    } else {
      setPasswordError(true);
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  return (
    <div className="whitePage login">
      <h1>Accéder à mon espace Admin</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="password"
          ref={ref}
          placeholder="Saisir votre mot de passe"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="submit"
          value="Se connecter"
          className={"button,  greenButton"}
        />
      </form>
      {passwordError && (
        <BlockMessage
          message={"Veuillez entrer un mot de passe valide"}
          styles={"errorMessage"}
        />
      )}
    </div>
  );
};

export default Login;
