import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../logo.svg";
import "../../App.css";
import { Button } from "antd";
import Konferencija from "../Konferencija";

const LogIn = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    window.location.pathname = "/konferencije";
    return <Konferencija />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Dobro dosli!</p>
        <p>PISIO AM: Servis za upravljanje konferencijama</p>
        <Button onClick={loginWithPopup}>Pristupite sistemu</Button>
      </header>
    </div>
  );
};

export default LogIn;
