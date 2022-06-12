import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./asset/scss/App.scss";
import logo from "./asset/images/logo.svg";

import Home from "./Pages/Home";
import MyForm from "./Pages/User/Form";
import Login from "./Pages/Login";
import HomeBackoffice from "./Pages/Backoffice/HomeBackoffice";
import CreateNewForm from "./Pages/Backoffice/CreateNewForm";
import UpdateForm from "./Pages/Backoffice/UpdateForm";
import FormAnswer from "./Pages/Backoffice/FormAnswer";

function App() {
  const [page, setPage] = useState("");
  //Login system
  const [isConnected, setIsConnected] = useState(
    Cookies.get("adminConnected") || null
  );
  const setAdminCookie = (isConnected) => {
    if (isConnected !== null) {
      Cookies.set("adminConnected", isConnected, { expires: 10 });
    }
    setIsConnected(isConnected);
  };

  //logout system
  const toLogout = (setIsConnected) => {
    Cookies.remove("adminConnected");
    setIsConnected(null);
  };

  return (
    <Router>
      <header className="header">
        <div className="headerDiv">
          <Link to="/">
            <img src={logo} className="header-logo" alt="logo" />
          </Link>
          <nav>
            {page !== "backofficeHome" && (
              <Link
                to={isConnected ? "/backoffice" : "/backoffice/login"}
                className={"greenButton"}
              >
                Backoffice
              </Link>
            )}

            {isConnected && (
              <Link to="/" onClick={toLogout} className={"redButton"}>
                Deconnexion
              </Link>
            )}
          </nav>
        </div>
      </header>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {isConnected ? (
            <>
              <Route path="/backoffice" element={<HomeBackoffice setPage={setPage} />} />
              <Route
                path="/backoffice/create/:component"
                element={<CreateNewForm />}
              />
              <Route
                path="/backoffice/update/:component/:_id"
                element={<UpdateForm />}
              />
              <Route path="/backoffice/form/:_id" element={<FormAnswer />} />
              <Route path="/backoffice/answers/:_id" element={<FormAnswer />} />
            </>
          ) : (
            <>
              <Route
                path="/backoffice/login"
                element={<Login setAdminCookie={setAdminCookie} />}
              />
            </>
          )}
          <Route path="/form/:slug" element={<MyForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
