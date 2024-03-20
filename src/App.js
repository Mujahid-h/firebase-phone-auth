// App.js
import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles.css";
import PhoneSignup from "./components/PhoneSignup";

const App = () => {
  return (
    <div className="container">
      {/* <div className="column">
        <Signup />
      </div>
      <div className="column">
        <Login />
      </div> */}
      <PhoneSignup />
    </div>
  );
};

export default App;
