const VALIDATION_ERRORS = {
    INVALID_INPUT: {
      code: 5001,
      message: 'Invalid input. Please check your data and try again.',
    },
    MISSING_REQUIRED_FIELD: {
      code: 5002,
      message: 'A required field is missing. Please fill in all required fields.',
    },
    EMAIL_FORMAT_INVALID: {
      code: 5003,
      message: 'The provided email format is invalid.',
    },
    PASSWORD_TOO_SHORT: {
      code: 5004,
      message: 'Password must be at least 6 characters long.',
    },
    DATA_VALIDATION_FAILED: {
      code: 5005,
      message: 'Data validation failed. Please review the provided data.',
    },
  };
  module.exports = VALIDATION_ERRORS
  