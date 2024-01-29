import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, ForgotPassword, Register } from "./views/authentication";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={() => <div>Home</div>} path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={Register} path="/register" />
        <Route Component={ForgotPassword} path="/forget" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
