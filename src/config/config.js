require('dotenv').config();

class Config {
  constructor() {
    this.PORT = process.env.PORT || 8080;
    this.MONGO_URL =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/disney-api';
  }
}

module.exports = new Config();
