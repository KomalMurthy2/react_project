import React, { Component } from "react";
import CompanyDataService from "../services/list-service";
import ReactHtmlParser from 'react-html-parser'

export default class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.retrieveCompanies = this.retrieveCompanies.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.onSelectCompany = this.onSelectCompany.bind(this);

    this.state = {
      companies: [],
      currentCompany: null,
      searchNames: null,
      searchTitle: "",
      eleSelected: true,
      searchCompany: "",
      searchCin: ""
    };
  }

  componentDidMount() {
    this.retrieveCompanies();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
      eleSelected: true
    });
    CompanyDataService.getCompanies(searchTitle).then(response => {
        console.log('listing',response.data);
        this.setState({
            searchNames: response.data
        })
        console.log('hjgjhg',this.state.searchNames);
      })
      .catch(e => {
        console.log(e);
      });
  }
  onSelectCompany(e){
    function getName(str) {
      return str.substring(str.lastIndexOf("/") + 1, str.length);
    }
    const temp = e.target;
    if (temp.hasAttribute("id")) {
    var tempId = temp.getAttribute('id')
    var tempName = tempId.substring(0, tempId.lastIndexOf("/") + 0);
    var companyId = getName(tempId)
    var companyName = getName(tempName)
    console.log("clicked",temp,companyId,companyName);
    this.setState({
      eleSelected: false,
      searchCompany : companyName,
      searchCin: companyId
    });
  }

  }

  // Create New Company
  saveCompany() {
    var data = {
      cin: this.state.searchCin,
      name: this.state.searchCompany
    };
    console.log(data);

    CompanyDataService.create(data)
      .then(response => {
        this.setState({
          searchCompany : ""
          // submitted: true
        });
        console.log(response.data,window);
        window.location.pathname ='/listing'
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveCompanies() {
    CompanyDataService.getAll()
      .then(response => {

        this.setState({
          companies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentCompany: null,
      eleSelected: true
    });

  }

  render() {
    const searchStyle = {
            'background': '#fff none repeat scroll 0 0',
            'borderColor' : '-moz-use-text-color #ccc #ccc',
            'borderStyle': 'none solid solid',
            'borderWidth' : 'medium 1px 1px',
            'display': 'block',
            'marginTop': '-10px',
            'maxHeight': '209px',
            'overflow': 'auto',
            'padding': '0',
            'position': 'absolute',
            'textAlign': 'left',
            'width': '90%',
            'zIndex': '9999'
    }
    const { searchTitle, companies, currentCompany, searchNames, eleSelected,searchCompany, searchCin } = this.state;

    return (
      console.log('fdfddfeffevfd',searchCompany),
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
          <div className="input-group mb-3">
              { searchNames && eleSelected == true? (
                <div style={searchStyle} id='result'
                value = {searchNames}
                onClick={this.onSelectCompany}
                >
                {ReactHtmlParser(searchNames)}
                </div>):null
              }
          </div>
        </div>
        
        <div className="col-md-6">
          {searchCompany ? (
            <div>
              <h4>Company Details</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {searchCompany}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please select a Company...</p>
            </div>
          )}
          <button
            className="m-3 btn btn-sm btn-success"
            onClick={this.saveCompany}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
