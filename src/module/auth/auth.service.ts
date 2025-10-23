import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from "../../errors/AppError";
import { UserModel } from "../common/user/user.model";
import { IChanagePassword, IjwtPayload, ILoginUser } from "./auth.interface";
import { Status } from '../common/user/user.constant';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

        const jwtPayload: IjwtPayload = {
            userId: user.id,
            userRole: user.role,
        }

        const jwtOptions = { expiresIn: config.jwt_access_expires_in as string }

        if (!config.jwt_access_secret) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT secret key is not configured');
        }

        if (!config.jwt_access_expires_in) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT ERROR');
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
            console.log("matched")
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

        if (!isUserExist) {
            throw new AppError(404, "User Dosn't Exist");
        }
        console.log({ isUserExist })
        const match = await bcrypt.compare(payload?.oldPassword, isUserExist?.password)
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
                status: isUserExist?.status === Status.BLOCKED ? isUserExist?.status : Status.ACTIVE, // this account is now active after changing the default password.
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

export const loginUserService = {
    loginUser,
    changePassword
}