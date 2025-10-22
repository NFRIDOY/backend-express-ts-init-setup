
export type ILoginUser = {
    id: string;
    password: string;
}

export type IChanagePassword = {
    oldPassword: string;
    newPassword: string;
}

export type IjwtPayload = {
    userId: string;
    userRole: string;
    iat?: number;
    exp?: number;
} 