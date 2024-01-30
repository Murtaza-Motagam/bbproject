import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./views/authentication/Register";
import Login from "./views/authentication/Login";
import Footer from "./components/Footer";
import Alert from "./components/Alert";

const App = () => {

  const [alert, setAlert] = useState("");

  const showAlert = (mode, textType, type, message) => {
    setAlert({
      mode: mode,
      textType: textType,
      type: type,
      msg: message
    });

    setTimeout((showAlert) => {
      setAlert(null);
    }, 6000);
  };


  return (
    <BrowserRouter>
      <Alert alert={alert} />
      <Routes>
        <Route Component={() => <div>Home jaimin</div>} path="/" />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/register" element={<Register showAlert={showAlert}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
