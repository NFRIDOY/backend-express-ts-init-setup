import { Schema, model, connect } from 'mongoose';
import { bloodGroups, GENDER_LIST, IGuardian, ILocalGuardian, IName, IStudent } from './student.interface';

// Name Schema
export const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, "Max Length is 20 Charecters"],
    validate: {
      validator: function(value: string) {
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
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  }
})

const baseGuardianFields = {
  name: nameSchema,
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
};

export const guardianSchema = new Schema<IGuardian>(baseGuardianFields);

export const localGuardianSchema = new Schema<ILocalGuardian>({
  ...baseGuardianFields,
  occupation: {
    type: String,
    required: true,
  },
});


// This is the main schema for the student model
const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
  },
  name: {
    type: nameSchema,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: GENDER_LIST,
      message: `{VALUE} is not valid.`
    },
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  bloodGroup: {
    type: String,
    enum: bloodGroups,
    required: false,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  status: {
    type: String,
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
});

export const Student = model<IStudent>('Student', studentSchema);