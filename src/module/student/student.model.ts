import { Schema, model, connect } from 'mongoose';
import { IGuardian, ILocalGuardian, IStudent } from './student.interface';
import { nameSchema } from '../common/user/user.model';
import { bloodGroups, GENDER_LIST } from '../common/user/user.interface';



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
    ref: 'User',
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
  emergencyPhone: {
    type: String,
    required: false,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: false,
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
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'academicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
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
},
{
  toJSON: {
    virtuals: true // [MUST] virtual turned on as option 
  }
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
});

// isDeleted checking // unavilable to get for for every find operation
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

// isDeleted checking // unavilable to get for for every find operation
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

// dont show user _id
// studentSchema.post('save', function (doc, next) {
//   // Remove sensitive/internal fields
//   doc = doc.toObject(); // convert to plain object
//   doc.user = "";
//   doc.__v = "";
//   next();
// })

export const StudentModel = model('student', studentSchema);