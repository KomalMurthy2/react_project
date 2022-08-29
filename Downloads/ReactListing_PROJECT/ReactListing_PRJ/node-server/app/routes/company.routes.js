module.exports = app => {
    const companies = require("../controllers/comapnies.controller");
  
    var router = require("express").Router();
  
    // Create a new Company
    router.post("/", companies.create);
  
    // Retrieve all Companies
    router.get("/", companies.findAll);

    // Retrieve Custom Companies
    router.get("/companies-list/:id", companies.customSearch);
  
    // Retrieve a single Company with id
    router.get("/:id", companies.findOne);
  
    app.use("/api/companies", router);
  };
  