import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './Logo-ute.png';

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddBien from "./components/add-bien.component";
import Auxroute from "./components/Auxroute";
import BienesList from "./components/bienes-list.component";


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/bienes"} className="navbar-brand">
            Bienes <img src={logo} alt='Logo UTE' style={{width: '20%'}} />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/bienes"} className="nav-link">
                Lista de bienes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Añadir
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<BienesList />} />
            <Route exact path='/bienes' element={<BienesList />} />
            <Route exact path="/add" element={<AddBien />} />
            <Route path="/bienes/:id" element={<Auxroute />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
