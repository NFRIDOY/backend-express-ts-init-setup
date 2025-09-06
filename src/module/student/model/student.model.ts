import { Schema, model, connect } from 'mongoose';
import { IStudent } from '../interface/student.interface';

// 1. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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
    },
  },
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
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  guardian: {
    id: {
      type: String,
      required: true,
    },
    name: {
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
      },
    },
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
  }
});