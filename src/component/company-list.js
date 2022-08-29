import React, { Component } from "react";
import CompanyDataService from "../services/list-service";

export default class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCompanies = this.retrieveCompanies.bind(this);

    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    this.retrieveCompanies();
  }

  retrieveCompanies() {
    CompanyDataService.getAll()
      .then(response => {
        
        this.setState({
          companies: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
    
  render() {
    const { companies} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
                <h4>Company List</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">CIN</th>
                        <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies ? companies.map((item) =>(
                        <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.cin}</td>
                        <td>{item.name}</td>
                        </tr>
                        )): null
                        }
                    </tbody>
                </table>
        </div>
      </div>
    );
  }
}
