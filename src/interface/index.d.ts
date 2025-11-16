import { JwtPayload } from 'jsonwebtoken';
import { IRole } from '../module/common/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      role: IRole[];
      data: any;
    }
  }
}