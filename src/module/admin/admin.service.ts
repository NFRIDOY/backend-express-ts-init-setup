import QueryBuilder from "../../builder/QueryBuilder";
import { CONST } from "../../config";
import AppError from "../../errors/AppError";
import flattenNestedDeepKey from "../../utils/flattenNestedDeepKey";
import { adminSearchableFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

// const createAdminIntoDB = async (admin: IAdmin): Promise<IAdmin> => {
//   const result = await AdminModel.create(admin)
//   return result;
// }
const getAllAdminFromDB = async (query: Record<string, unknown>): Promise<IAdmin[]> => {
  // const result = await AdminModel.find().populate('admissionSemester').populate({
  //   path: 'user',
  //   select: '-_id -password -__v', // Exclude the password field
  // });
  const adminQuery = new QueryBuilder(AdminModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'user',
      select: '-_id -password -__v',
    }), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;
  return result;
}
const getSingleAdminByAdminIdFromDB = async (adminID: string): Promise<IAdmin | null> => {
  const result = await AdminModel.findOne({ id: adminID }).populate('admissionSemester').populate({
    path: 'user',
    select: '-_id -password -__v', // Exclude the password field
  });
  return result;
}

const updateAdminByAdminIdOnDB = async (adminID: string, payload: Partial<IAdmin>): Promise<IAdmin | null> => {
  try {
    const { name, ...remainingAdminData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingAdminData,
      ...(name ? flattenNestedDeepKey('name', name) : {}),
    };


    // if (name && Object.keys(name).length) {
    //   for (const [key, value] of Object.entries(name)) {
    //     modifiedUpdatedData[`name.${key}`] = value;
    //   }
    // }

    // const result = await AdminModel.updateOne({ id: adminID }, payload) // for optimized bendwith // minimul data response
    const result = await AdminModel.findOneAndUpdate({ id: adminID }, modifiedUpdatedData, { new: true })
      .populate('admissionSemester')
      .populate({
        path: 'user',
        // select: '-_id -password -__v', // Exclude the password field
        select: CONST.defaultClassifiedFields, // Exclude the password field
      });
    return result;
  } catch (err) {
    throw new AppError(400, "Failed To Update The Admin");
  }
}

export const adminService = {
  getAllAdminFromDB,
  getSingleAdminByAdminIdFromDB,
  updateAdminByAdminIdOnDB
}