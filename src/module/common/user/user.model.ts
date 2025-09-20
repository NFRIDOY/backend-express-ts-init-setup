import mongoose, { Schema } from "mongoose";
import { IUser, statusList, userRoles } from "./user.interface";

// User Schema
const UserSchema = new Schema<IUser>({
    id: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    needsPasswordChange: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    role: { 
        type: String, 
        enum: userRoles,
        required: true 
    },
    status: { 
        type: String, 
        enum: statusList,
        required: true,
        default: "in-progress"
    },
    isDeleted: { 
        type: Boolean, 
        required: true,
        default: false,
    },
  },
{
    timestamps: true
});

// User Model
export const UserModel = mongoose.model('User', UserSchema);