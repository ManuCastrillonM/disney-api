class Config {
  constructor() {
    this.MODE = process.env.MODE || 'dev'
    this.PORT = process.env.PORT || 8080
    this.MONGO_URL =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/disney-api'
  }
}

module.exports = new Config()
