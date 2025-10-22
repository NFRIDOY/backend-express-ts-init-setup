import dotenv from 'dotenv'
import path from 'path'
require('dotenv').config()

// dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_pass: process.env.DEFAULT_PASS,
    bcrypt_salt: process.env.BCRYPT_SALT,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
}

export const constants = {
    development: "development",
    production: "production",
    hideDefaultFields: '-password -__v',
} as const