import dotenv from 'dotenv'
import path from 'path'
require('dotenv').config()

// dotenv.config({ path: path.join(process.cwd(), '.env') })

export default{
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_pass: process.env.DEFAULT_PASS,
    bcrypt_salt: process.env.BCRYPT_SALT,
}

export const constants = {
    development: "development",
    production: "production",
    defaultClassifiedFields: '-password -__v',
} as const