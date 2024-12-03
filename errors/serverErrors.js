const SERVER_ERRORS = {
    INTERNAL_SERVER_ERROR: {
      code: 6001,
      message: 'Something went wrong. Please try again later.',
    },
    DATABASE_CONNECTION_FAILED: {
      code: 6002,
      message: 'Could not connect to the database.',
    },
    SERVER_OVERLOAD: {
      code: 6003,
      message: 'The server is currently overloaded. Please try again later.',
    },
    UNKNOWN_ERROR: {
      code: 6004,
      message: 'An unknown error occurred.',
    },
  };
  
  module.exports = SERVER_ERRORS