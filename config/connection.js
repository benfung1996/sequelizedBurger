var Sequelize = require("sequelize");

var connection;

if (process.env.JAWSDB_URL) {
    connection = new Sequelize.(process.env.JAWSDB_URL);
} else {
    connection = new Sequelize("burgers_db", "root", "password", {
        host: "localhost",
        dialect: "mysql"
    });
};

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = connection;
