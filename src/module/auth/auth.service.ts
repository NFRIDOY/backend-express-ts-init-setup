import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from "../../errors/AppError";
import { UserModel } from "../common/user/user.model";
import { IChanagePassword, ILoginUser } from "./auth.interface";
import { Status } from '../common/user/user.constant';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { userValidation, verifyToken } from './auth.utils';
import { emailSender, IEmail } from '../../utils/emailSender';


const loginUser = async (loginUser: ILoginUser) => {

    try {
        const { id, password } = loginUser;
        // normal findOne
        // const user = await UserModel.findOne({ id: id })

        // mongoose statics method
        const user = await UserModel.isUserExistByCustomID(id);

        // if (!user) {
        //     throw new AppError(404, "User Dosen't Exists") // User or Password doesn't match
        // }

        // // checking if the user is already deleted
        // const isDeleted = user?.isDeleted;

        // if (isDeleted) {
        //     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
        // }
        // // checking if the user is blocked

        // const userStatus = user?.status;

        // if (userStatus === Status.BLOCKED) {
        //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
        // }

        userValidation(user);
        if (!user?.password) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Login Failed"); // User or Password doesn't match
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Login Failed"); // User or Password doesn't match
        }



        const jwtOptions = { expiresIn: config.jwt_access_expires_in as string }

        if (!config.jwt_access_secret) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT secret key is not configured');
        }

        if (!config.jwt_access_expires_in) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT ERROR');
        }

        const jwtPayload: JwtPayload = {
            userId: user.id,
            userRole: user.role,
        }

        const accessToken = jwt.sign(
            jwtPayload,
            config.jwt_access_secret,
            { expiresIn: '365d' },
        );

        // const accessToken = jwt.sign(
        //     jwtPayload, 
        //     config.jwt_access_secret as string, 
        //     {
        //         expiresIn: config.jwt_access_expires_in as string ?? '24h',
        //     }
        // );

        // send jwt
        if (match) {
            //login
            // console.log("matched")
            return {
                accessToken: `Bearer ${accessToken}`,
                needsPasswordChange: user?.needsPasswordChange,
            };
        }
    } catch (error) {
        throw new AppError(500, "Failed to login User")
    }
}

const changePassword = async (user: JwtPayload, payload: IChanagePassword) => {
    try {
        // const { userId, userRole } = user
        // console.log({ user })
        // console.log({ payload })
        const isUserExist = await UserModel.findOne({ id: user?.userId })

        userValidation(isUserExist)
        // if (!isUserExist) {
        //     throw new AppError(404, "User Dosn't Exist");
        // }
        // if(isUserExist.status === Status.BLOCKED) {
        //     throw new AppError(404, "User is Blocked");
        // }
        // if(isUserExist.isDeleted === true) {
        //     throw new AppError(404, "User is Deleted");
        // }
        // console.log({ isUserExist })
        const match = await bcrypt.compare(payload?.oldPassword, isUserExist?.password as string)
        if (!match) {
            throw new AppError(401, "Wrong Password");
        }

        const newPassword = await bcrypt.hash(
            payload.newPassword,
            Number(config.bcrypt_salt)
        );

        const updatePassword = await UserModel.findOneAndUpdate(
            {
                id: user.userId,
                role: user.userRole,
            },
            {
                password: newPassword,
                needsPasswordChange: false,
                passwordChangedAt: new Date(),
                // check if user is changing password for first time or not.
                status: isUserExist?.status !== Status.PROGRESS ? Status.ACTIVE : isUserExist?.status, // this account is now active after changing the default password.
            },
            { new: true })
        if (!updatePassword) {
            throw new AppError(500, "Update Password Failed");
        }
        return true;
    } catch (error) {
        console.log({ error })
        return false;
        // throw new AppError(500, "Internal Error. Update Password Failed", error);
    }
}

/** 
 * user hit the forget password endpoint
 * user provide email
 * we send a token to the email
 * user click the link in the email
 * we verify the token
 * we update the password
 * we send a success message
 */
/**
 * 
 * @param payload { email: string }
 * @returns { token: string }
 * @description user hit the forget password endpoint
 * @description user provide email
 * @description we send a token to the email
 * @description user click the link in the email
 * @description we verify the token
 * @description we update the password
 * @description we send a success message
 */
const forgetPassword = async (payload: { userId: string, email: string }) => {
    // const { userId, email } = payload;
    // TODO: gives accessToken via nodeMailer email
    try {
        const user = await UserModel.findOne({ email: payload.email, id: payload.userId })
        userValidation(user)

        const jwtPayload: JwtPayload = {
            userId: user?.id as string,
            userRole: user?.role as string,
            email: user?.email as string,
            website: config.genarel_reset_password_url, // password reset website link
            backend: config.backend_url, // new password sending link
        }
        /**
         * TODO:
         * add a UI for forgetpassword
         * 
         */

        const resetToken = jwt.sign(
            jwtPayload,
            config.jwt_access_secret as string,
            { expiresIn: '5m' },
        );
        const urlToken = `${config?.genarel_reset_password_url}?token=${resetToken}`;

        const emailSenderObj: IEmail = {
            from: config.email_user as string,
            to: user?.email as string,
            subject: 'Do You Want To Reset Your Password?',
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
                    <h2>Password Reset Request</h2>
                  </div>
                  <div style="padding: 30px;">
                    <p>Hi ${user?.id || 'there'},</p>
                    <p>We received a request to reset your password. If you made this request, please click the button below to proceed:</p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${urlToken}" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                    </div>
                    <p>If the button doesn't work, you can copy and paste the following token into the reset form:</p>
                    <div style="background-color: #f9f9f9; border: 1px dashed #ccc; padding: 15px; font-family: monospace; font-size: 14px; word-break: break-all; color: #333;">
                      ${urlToken}
                    </div>
                    <p>If you didn’t request a password reset, you can safely ignore this email.</p>
                    <p style="margin-top: 40px;">Thanks,<br>The ${config?.app_name || 'Support'} Team</p>
                  </div>
                  <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                    <p>If you have any questions, contact us at <a href="mailto:${config?.support_email}" style="color: #007bff;">${config?.support_email}</a></p>
                  </div>
                </div>
              </div>
            `
        }

        // send email with the accessToken
        await emailSender(emailSenderObj)

        return true;

    } catch (err) {
        console.log({ err })
        throw new AppError(500, "Internal Error. Forget Password Email Sending Failed", err);
    }
}
const resetPassword = async (token: string, payload: { newPassword: string }) => {
    // TODO: accessToken verify ID and token update password on db
    const decoded = await verifyToken(token)

    if (!decoded) {
        throw new AppError(401, "Invalid Token")
    }

    const user = await UserModel.findOne({ email: decoded?.email })

    await userValidation(user)

    const hashedPassword = await bcrypt.hash(payload?.newPassword as string, Number(config.bcrypt_salt));

    const result = await UserModel.findOneAndUpdate(
        { email: decoded?.email },
        { password: hashedPassword },
    );

    return result ? true : false;
}

export const loginUserService = {
    loginUser,
    changePassword,
    forgetPassword,
    resetPassword,
}