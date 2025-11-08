import mongoose, { Schema } from "mongoose";
import { IName, IUser, statusList, IUserStatics, userRoles } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";
import { result } from "lodash";

// Name Schema
export const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, "Max Length is 20 Charecters"],
    validate: {
      validator: function (value: string) {
        const validStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() // Custome Capitalized Logic
        return validStr === value;
      },
      message: "{VALUE} is not Capitalized.",
    }
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function (value: string) {
        const validStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() // Custome Capitalized Logic
        return validStr === value;
      },
      message: "{VALUE} is not Capitalized.",
    }
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const validStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() // Custome Capitalized Logic
        return validStr === value;
      },
      message: "{VALUE} is not Capitalized.",
    }
  }
})

// User Schema
const UserSchema = new Schema<IUser, IUserStatics>({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    // select: 0, // hide password from response
  },
  needsPasswordChange: {
    type: Boolean,
    required: true,
    default: true
  },
  passwordChangedAt: {
    type: Date,
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
  // console.log('user', user)

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt)
  );

  next();
})

// middleware or Hook
// pass is not on the IStudent fix it
UserSchema.post('save', function (doc, next) {
  doc.password = "";
  next();
})

// return all data with isDeleted : false

// // Hide password in all outputs
// UserSchema.set('toJSON', {
//     transform: function (doc, ret) {
//       delete ret.password;
//       return ret;
//     }
//   });


// static methods
UserSchema.statics.isUserExistByCustomID = async function (id: string) {
  return await UserModel.findOne({ id: id }).select('+password')
}
// static method: 
UserSchema.statics.isJWTIssuedBeforePasswordChanged = async function (passwordChangedTimestamp: Date, jwtIssuedTimestamp: number) {
  const passwordChangedTime = await new Date(passwordChangedTimestamp).getTime() / 1000;
  console.log("passwordChangedTime ", passwordChangedTime)
  console.log("jwtIssuedTimestamp ", jwtIssuedTimestamp)
  const result = passwordChangedTime > jwtIssuedTimestamp;
  console.log("result", result)
  return result;
}

// User Model
export const UserModel = mongoose.model<IUser, IUserStatics>('User', UserSchema);