const AUTH_ERRORS = {
    UNAUTHORIZED: {
      code: 2001,
      message: 'You are not authorized to access this resource.',
    },
    INVALID_CREDENTIALS: {
      code: 2002,
      message: 'Invalid email or password.',
    },
    TOKEN_EXPIRED: {
      code: 2003,
      message: 'Your session has expired. Please log in again.',
    },
    TOKEN_INVALID: {
      code: 2004,
      message: 'The provided token is invalid.',
    },
    ACCESS_FORBIDDEN: {
      code: 2005,
      message: 'You do not have permission to perform this action.',
    },
  };

  module.exports = AUTH_ERRORS
  