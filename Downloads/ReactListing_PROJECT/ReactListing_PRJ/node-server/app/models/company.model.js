module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      cin: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Company;
  };
  