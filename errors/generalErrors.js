const GENERAL_ERRORS = {
    BAD_REQUEST: {
      code: 9001,
      message: 'The request is malformed or invalid.',
    },
    NOT_IMPLEMENTED: {
      code: 9002,
      message: 'This feature has not been implemented yet.',
    },
    TIMEOUT: {
      code: 9003,
      message: 'The request timed out. Please try again.',
    },
    SERVICE_UNAVAILABLE: {
      code: 9004,
      message: 'The service is temporarily unavailable. Please try again later.',
    },
  };
  
  module.exports = GENERAL_ERRORS