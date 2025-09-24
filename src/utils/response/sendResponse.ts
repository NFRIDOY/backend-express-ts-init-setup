import { Response } from 'express';

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
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
  payload: IApiResponse<T>
): void => {
  res.status(payload.statusCode).json({
    statusCode: payload.statusCode,
    success: payload.success,
    message: payload.message,
    data: payload.data,
    ...(payload.meta && { meta: payload.meta }),
  });
};

export const sendErrorResponse = <T>(
  res: Response,
  payload: Partial<IApiResponse<T>>
): void => {
  res.status(payload.statusCode || 500).json({
    statusCode: payload.statusCode || 500,
    success: payload.success || false,
    message: payload.message || "Failed",
    data: payload.data,
    ...(payload.meta && { meta: payload.meta }),
  });
};
