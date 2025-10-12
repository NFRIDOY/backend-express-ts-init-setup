export type IBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export const bloodGroups: IBloodGroup[] = [ "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",];

export type IRole = 'admin' | 'student' | 'faculty';
export const userRoles: IRole[]= ['admin' , 'student' , 'faculty'] as const;

// export type IStatus = 'active' | 'in-progress' | 'blocked';
// export const statusList: IStatus[] = ['active', 'in-progress', 'blocked'] as const;

// DRY Version
export const statusList = ['in-progress', 'active', 'blocked'] as const;
export type IStatus = typeof statusList[number];        // typeof array[number]

export const GENDER_LIST = ["male", "female", "other"] as const;
export type IGender = "male" | "female" | "other";

export type IName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}
export interface IPersonalInfo {
    name: IName;
    email: string;
    phone: string;
    emergencyPhone?: string;
    dateOfBirth?: string;
    gender: IGender;
    profileImage?: string;
    bloodGroup?: IBloodGroup;
    presentAddress: string;
    permanentAddress: string;
}

export type IUser = {
    id: string;
    password: string;
    needsPasswordChange?: boolean;
    role: IRole;
    status: IStatus;
    isDeleted?: boolean;
}