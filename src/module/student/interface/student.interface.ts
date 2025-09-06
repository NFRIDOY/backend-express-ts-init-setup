export type IName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type IGender = "male" | "female" | "other";

export type IStatus = "active" | "inactive" | "pending" | "blocked" | "deleted";

export type IParent = {
    id: string;
    name: IName;
    email: string;
    phone: string;
    address?: string;
}
export type IGuardian = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
}

export type IStudent = {
    id: string;
    name: IName;
    email: string;
    phone: string;
    address: string;
    gender: IGender;
    profileImage?: string;
    isActive: boolean;
    status?: IStatus;
    isDeleted: boolean;
    guardian?: IGuardian;
    parent?: IParent[];
    // parent?: [IParent, IParent?]; /** This allows your student to have 0, 1, or multiple parents. */

}