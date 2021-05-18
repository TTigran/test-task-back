require('dotenv').config();

const config = {
    "development": {
        "username": process.env.DB_DEV_USERNAME,
        "password":  process.env.DB_DEV_PASSWORD,
        "database":  process.env.DB_DEV_NAME,
        "host":  process.env.DB_DEV_HOST,
        "dialect": process.env.DB_DEV_PORT
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password":  process.env.DB_PASSWORD,
        "database":  process.env.DB_NAME,
        "host":  process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT
    },
    "production": {
        "username": process.env.DB_PROD_USERNAME,
        "password":  process.env.DB_PROD_PASSWORD,
        "database":  process.env.DB_PROD_NAME,
        "host":  process.env.DB_PROD_HOST,
        "dialect": process.env.DB_PROD_PORT
    }
}

module.exports = config