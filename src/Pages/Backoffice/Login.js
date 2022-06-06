import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAdminCookie }) => {
  const [password, setPassword] = useState("admin");
  const [passwordError, setPasswordError] = useState(false);
  console.log("password", password);

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

  const [hover, setHover] = useState(false);

  const MouseOver = () => {
    setHover(true);
  };

  const MouseOut = () => {
    setHover(false);
  };

  const ref = useRef(null);
  useEffect(() => {
    ref?.current?.focus?.();
  }, [ref]);

  return (
    <div>
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
          className={hover ? "buttonLoginHover" : "buttonBackLoginNormal"}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
        />
      </form>
      {passwordError && <p>Veuillez entrer une adresse email valide.</p>}
    </div>
  );
};

export default Login;
