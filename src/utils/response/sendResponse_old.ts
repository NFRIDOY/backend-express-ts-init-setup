import { Response } from 'express';

interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export const sendResponse = <T>(
  res: Response,
  {
    statusCode,
    success,
    message,
    data,
    meta,
  }: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta?: IApiResponse<T>['meta'];
  }
): void => {
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
    ...(meta && { meta }),
  });
};
