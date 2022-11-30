import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import User from './Store/UserContext'
import './index.scss'
import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
     <User>
      <BrowserRouter>
      <App />
      </BrowserRouter>
       
      </User> 
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
