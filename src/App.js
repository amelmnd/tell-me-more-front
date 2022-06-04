import logo from "./asset/images/logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{width: 250, heigth:50}} />
      </header>
      <p>Bienvenue 😄</p>
    </div>
  );
}

export default App;
