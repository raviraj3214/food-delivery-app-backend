class AppError extends Error {
    constructor(message, statusCode, errorCode) {
      super(message);
      this.statusCode = statusCode || 500;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      this.errorCode = errorCode || null; // Include error code
    }
  }
  
  module.exports = AppError;
  



// class AppError extends Error {
//     constructor(message, statusCode) {
//       super(message);
//       this.statusCode = statusCode || 500;
//       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//       this.isOperational = true;
//     }
//   }
  
//   module.exports = AppError;
  