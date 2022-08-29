import http from "../http-common";

class CompanyDataService {

// Custom API
  getCompanies(id){
    if (id.length >0) {
    return http.get(`/companies/companies-list/${id}`);
    }
  }

// Local API
  getAll() {
    return http.get("/companies");
  }

  get(id) {
    return http.get(`/companies/${id}`);
  }

  create(data) {
    return http.post("/companies", data);
  }
}

export default new CompanyDataService();