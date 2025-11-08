import dotenv from 'dotenv'
import path from 'path'
require('dotenv').config()

// dotenv.config({ path: path.join(process.cwd(), '.env') })

export const constants = {
    development: "development",
    production: "production",
    hideDefaultFields: '-password -__v',
} as const

export default {
    NODE_ENV: process.env.NODE_ENV,
    NODE_ENV_DEV: process.env.NODE_ENV === constants.development,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_pass: process.env.DEFAULT_PASS,
    bcrypt_salt: Number(process.env.BCRYPT_SALT),
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

    email_host: process.env.EMAIL_HOST,
    email_port: process.env.EMAIL_PORT,
    email_secure: process.env.EMAIL_SECURE,
    email_user: process.env.EMAIL_USER,
    email_app_password: process.env.EMAIL_APP_PASSWORD,

    genarel_reset_password_url: process.env.GENAREL_RESET_PASSWORD_URL,
    app_name: process.env.EMAIL_USER,
    support_email: process.env.EMAIL_USER,
    backend_url: process.env.BACKEND_URL,
    
    image_api_key: process.env.CLOUDINARY_API_KEY,
}

