import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/authStore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCINc9Vu-LdvDbtIHIXhjlgzB_nlripgSU",
  authDomain: `todos-app-a71f2.firebaseapp.com`,
  projectId: "todos-app-a71f2",
  storageBucket: `todos-app-a71f2.appspot.com`,
  messagingSenderId: "454466851805",
  appId: "1:454466851805:web:bd4e229b0ac4861251dc34",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
