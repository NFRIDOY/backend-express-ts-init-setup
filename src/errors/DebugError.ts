class DebugError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string, stack ?: any) {
      super(message);
      this.statusCode = statusCode;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default DebugError;


  /**
   * stack: it is a property of the Error object that contains the stack trace of the error for debugging
   * Error.captureStackTrace(this, this.constructor);: it is a method of the Error object that captures the stack trace of the error for debugging
   * this: it is the current object
   * this.constructor: it is the constructor function of the current object
   */