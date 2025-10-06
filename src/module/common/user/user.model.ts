import mongoose, { Schema } from "mongoose";
import { IUser, statusList, userRoles } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

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

// before saving on the db
UserSchema.pre('save', async function (next) {
    const user = this;
    console.log('user', user)

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt)
    );

    next();
})

// pass is not on the IStudent fix it
UserSchema.post('save', function (doc, next) {
    doc.password = "";
    next();
})

// // Hide password in all outputs
// UserSchema.set('toJSON', {
//     transform: function (doc, ret) {
//       delete ret.password;
//       return ret;
//     }
//   });
  


// User Model
export const UserModel = mongoose.model('User', UserSchema);