import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from "../../errors/AppError";
import { UserModel } from "../common/user/user.model";
import { ILoginUser } from "./auth.interface";
import { Status } from '../common/user/user.constant';
import jwt from 'jsonwebtoken';
import config from '../../config';


const loginUser = async (loginUser: ILoginUser) => {

    try {
        const { id, password } = loginUser;
        // normal findOne
        // const user = await UserModel.findOne({ id: id })

        // mongoose statics method
        const user = await UserModel.isUserExistByCustomID(id)

        if (!user) {
            throw new AppError(404, "User Dosen't Exists") // User or Password doesn't match
        }

        // checking if the user is already deleted

        const isDeleted = user?.isDeleted;

        if (isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
        }
        // checking if the user is blocked

        const userStatus = user?.status;

        if (userStatus === Status.BLOCKED) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Login Failed") // User or Password doesn't match
        }

        const jwtPayload: {
            userId: string;
            userRole: string;
        } = {
            userId: user.id,
            userRole: user.role,
        }

        if (!config.jwt_access_secret) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT secret key is not configured');
        }

        const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
            expiresIn: config.jwt_access_expires_in as string ?? '24h',
        });

        // send jwt
        if (match) {
            //login
            console.log("matched")
            return {
                accessToken,
                needsPasswordChange: user?.needsPasswordChange,
            };
        }
    } catch (error) {
        throw new AppError(500, "Failed to login User")
    }
}

export const loginUserService = {
    loginUser,
}