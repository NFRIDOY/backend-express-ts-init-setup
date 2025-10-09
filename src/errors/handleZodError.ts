import { ZodError, ZodIssue } from 'zod';
import { IErrorSources, IGenericErrorResponse } from '../interface/error.interface';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  // TODO: 'ZodIssue' is deprecated. PLEASE update.
  const errorSources: IErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
