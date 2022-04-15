import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/header";
import Footer from "./components/footer";
import reportWebVitals from "./reportWebVitals";
import UpdateFood from "./components/editFood";
import Login from "./components/login";
import NewFoodForm from "./components/addFood";
import Register from "./components/registration";

ReactDOM.render(
  <Router>
      <Header/>
      <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/registration" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/new_food" element={<NewFoodForm />}/>
          <Route path="/update_food" element={<UpdateFood />}/>
      </Routes>
      <Footer/>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
