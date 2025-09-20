
export type IRole = 'admin' | 'student' | 'faculty';
export const userRoles: IRole[]= ['admin' , 'student' , 'faculty'] as const;

// export type IStatus = 'active' | 'in-progress' | 'blocked';
// export const statusList: IStatus[] = ['active', 'in-progress', 'blocked'] as const;

// DRY Version
export const statusList = ['in-progress', 'active', 'blocked'] as const;
export type IStatus = typeof statusList[number];        // typeof array[number]

export type IUser = {
    id: string;
    password: string;
    needsPasswordChange?: boolean;
    role: IRole;
    status: IStatus;
    isDeleted?: boolean;
}