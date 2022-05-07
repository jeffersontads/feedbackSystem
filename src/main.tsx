import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  /**
   * STRICT MODE, ativa o modo restrito do react para que quando estamos esrevendo o codigo nao comenta erros
   */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
