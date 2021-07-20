import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Suspense } from "react";
import { CircularProgress } from "@material-ui/core";

const RootApp = () => {
  return (
    <React.StrictMode>
      <Suspense fallback={<CircularProgress />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
};

const container = document.getElementById("cv-root");

const root = ReactDOM.createRoot(container);

root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
