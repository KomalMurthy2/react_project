import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCompany from "./component/add-company";
import CompanyList from "./component/company-list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/listing"} className="navbar-brand">
            Listing Inc
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Company
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/listing"} className="nav-link">
                Company Lists
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/add"]} component={AddCompany} />
            <Route exact path="/listing" component={CompanyList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
