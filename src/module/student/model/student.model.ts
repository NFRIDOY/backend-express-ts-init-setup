import { Schema, model, connect } from 'mongoose';
import { bloodGroups, GENDER_LIST, IGuardian, ILocalGuardian, IName, IStudent } from '../interface/student.interface';

// Name Schema
export const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  }
})

const baseGuardianFields = {
  name: nameSchema,
  email: {
    type: String,
    required: true,
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
  },
  name: nameSchema,
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: GENDER_LIST,
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