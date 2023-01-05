const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  gdeltHost: process.env.HOST,
  gdeltUser: process.env.gdeltUSER,
  gdeltPassword: process.env.PASSWORD,
  gdeltDatabase: process.env.DATABASE,
  PROJECT_ROOT: __dirname + "/.."
};


