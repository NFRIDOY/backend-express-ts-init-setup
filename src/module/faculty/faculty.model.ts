import { Schema, model, connect } from 'mongoose';
import { IFaculty } from './faculty.interface';
import { bloodGroups, GENDER_LIST } from '../common/user/user.interface';
import { nameSchema } from '../common/user/user.model';


// This is the main schema for the faculty model
const FacultySchema = new Schema<IFaculty>({
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
  designation: {
    type: String,
    required: true,
  },
  facultyCode: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
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
FacultySchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
});

// isDeleted checking // unavilable to get for for every find operation
FacultySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

// isDeleted checking // unavilable to get for for every find operation
FacultySchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

export const FacultyModel = model('faculty', FacultySchema);