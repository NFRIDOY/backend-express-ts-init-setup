import z from "zod";
import { nameSchema } from "../common/user/user.validation";
import { bloodGroups, GENDER_LIST } from "../common/user/user.interface";

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    admin: z.object({
      name: nameSchema,
      email: z.string().trim().email(),
      phone: z.string().trim().min(1),
      emergencyPhone: z.string().trim().optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(GENDER_LIST),
      profileImage: z.string().optional(),
      bloodGroup: z.enum(bloodGroups).optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      adminCode: z.string().optional(),
      isActive: z.boolean().default(true),
      status: z.string().default('active'),
      isDeleted: z.boolean().default(false),
    })
  })
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: nameSchema,
      email: z.string().trim().email(),
      phone: z.string().trim().min(1),
      emergencyPhone: z.string().trim().optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(GENDER_LIST).optional(),
      profileImage: z.string().optional(),
      bloodGroup: z.enum(bloodGroups).optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      adminCode: z.string().optional(),
      isActive: z.boolean().default(true),
      status: z.string().default('active'),
      isDeleted: z.boolean().default(false),
    }).optional()
  }).optional()
});

export const AdminValidationSchema = {
  createAdmin: createAdminValidationSchema,
  updateAdmin: updateAdminValidationSchema
};

/**
 * Admin REQUEST obj
{
  "password": "123456",
  "admin": {
    "name": {
      "firstName": "Muhammad",
      "middleName": "Salahuddin",
      "lastName": "Ali"
    },
    "email": "muhammad.ali@admin.edu.bd",
    "phone": "01711223344",
    "emergencyPhone": "01899887766",
    "dateOfBirth": "2006-03-21",
    "gender": "male",
    "profileImage": "https://example.com/images/muhammad-ali.jpg",
    "guardian": {
      "name": {
        "firstName": "Abdul",
        "middleName": "Karim",
        "lastName": "Ali"
      },
      "email": "abdul.karim@example.com",
      "phone": "01922334455",
      "address": "House 45, Road 10, Uttara, Dhaka"
    },
    "parent": [
      {
        "id": "PARENT002",
        "name": {
          "firstName": "Abdul",
          "middleName": "Karim",
          "lastName": "Ali"
        },
        "email": "abdul.karim@example.com",
        "phone": "01922334455",
        "address": "House 45, Road 10, Uttara, Dhaka"
      }
    ],
    "localGuardian": {
      "name": {
        "firstName": "Shamsul",
        "middleName": "Haque",
        "lastName": "Khan"
      },
      "email": "shamsul.khan@example.com",
      "phone": "01633445566",
      "address": "Flat 3A, Block D, Mirpur DOHS, Dhaka",
      "occupation": "Engineer"
    },
    "bloodGroup": "B+",
    "presentAddress": "Flat 3A, Block D, Mirpur DOHS, Dhaka",
    "permanentAddress": "Village: Bhuapur, Upazila: Tangail Sadar, District: Tangail",
    "admissionSemester": "Spring 2025",
    "academicDepartment": "Electrical and Electronic Engineering"
  }
}
 */