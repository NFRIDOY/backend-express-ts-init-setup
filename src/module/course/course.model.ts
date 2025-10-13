import { Schema, model, connect } from 'mongoose';
import { ICourse, IPreRequisiteCourses } from './course.interface';

// pre
const PreRequisiteCourseSchema = new Schema<IPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course', // TODO: course model name from the mongobd table name
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
})

// This is the main schema for the course model
const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prifix: {
    type: String,
    required: [true, 'Prifix is required'],
    trim: true,
  },
  courseCode: {
    type: String,
    required: [true, 'Prifix is required'],
    trim: true,
  },
  credit: {
    type: Number,
    required: true,
    default: 1,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  preRequisiteCourses: [{
    type: PreRequisiteCourseSchema,
  }],
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

// isDeleted checking // unavilable to get for for every find operation
CourseSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

// isDeleted checking // unavilable to get for for every find operation
CourseSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

export const CourseModel = model('course', CourseSchema);