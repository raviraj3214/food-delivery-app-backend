const USER_ERRORS = {
    USER_NOT_FOUND: {
      code: 3001,
      message: 'User not found.',
    },
    DUPLICATE_EMAIL: {
      code: 3002,
      message: 'Email already exists. Please use a different email.',
    },
    PASSWORD_MISMATCH: {
      code: 3003,
      message: 'Passwords do not match.',
    },
    INVALID_USER_DATA: {
      code: 3004,
      message: 'The provided user data is invalid.',
    },
  };
  
module.exports = USER_ERRORS