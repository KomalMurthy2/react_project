const db = require("../models");
const request = require("request")
const Company = db.companies;
const Op = db.Sequelize.Op;

// Custom Zauba Corp Search 
exports.customSearch = (req, res) => {
  // Validate request
  const id = req.params.id;
  console.log('Request Item------',id);
  var options = {
    'method': 'VIEW',
    'url': 'https://www.zaubacorp.com/custom-search',
    'headers': {
      'Host': 'www.zaubacorp.com',
      'Content-Type': 'application/json',
      'Cookie': 'drupal.samesite=1'
    },
    body: JSON.stringify({
      "MIME Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "search": id,
      "filter": "company"
    })

  };
  request(options, function (error, response) {
    res.send(response.body);
  });
};

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cin) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Company
  const company = {
    cin: req.body.cin,
    name: req.body.name
  };

  // Save Company in the database
  Company.create(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Company.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Company with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id
      });
    });
};