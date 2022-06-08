import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import style from  "../asset/scss/login.scss";


const Login = ({ setAdminCookie }) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPasswordError(false);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === "admin") {
      console.log("create cookie");
      setAdminCookie(true);
      navigate("/backoffice");
    } else {
      console.log("not good password");
      setPasswordError(true);
    }
    console.log("password handleSubmit ", password);
  };

  const ref = useRef(null);
  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  return (
    <div className="whitePage">
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
      {passwordError && <p>Veuillez entrer un mot de passe valide.</p>}
    </div>
  );
};

export default Login;
