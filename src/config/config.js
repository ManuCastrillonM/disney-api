class Config {
  constructor () {
    this.MODE = process.env.MODE || 'dev'
    this.PORT = process.env.PORT || 8080
    this.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/disney'
  }
}

module.exports = new Config()
