module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mongo"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "testdb",
    "host": "localhost",
    "dialect": "mongo",
    "logging": false
  },
  "production": {
    "use_env_variable": "MONGODB_URI",
    "dialect": "mongo"
  }
};
