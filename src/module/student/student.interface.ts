export type IName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export const GENDER_LIST = ["male", "female", "other"] as const;
export type IGender = "male" | "female" | "other";
export type IBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export const bloodGroups: IBloodGroup[] = [ "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",];

export type IStatus = "active" | "inactive" | "pending" | "blocked" | "deleted";
export const STATUS_LIST: IStatus[] = ["active", "inactive", "pending", "blocked", "deleted"];

export type IParent = {
    id: string;
    name: IName;
    email: string;
    phone: string;
    address?: string;
}
export interface IGuardian {
    name: IName;
    email: string;
    phone: string;
    address?: string;
}
export interface ILocalGuardian extends IGuardian {
    occupation: string;
}

export type IStudent = {
    id: string;
    name: IName;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: IGender;
    profileImage?: string;
    guardian?: IGuardian;
    parent?: IParent[];
    // parent?: [IParent, IParent?]; /** This allows your student to have 0, 1, or multiple parents. */
    localGuardian?: ILocalGuardian;
    bloodGroup?: IBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    isActive: boolean;
    status?: IStatus;
    isDeleted: boolean;

}