const RESOURCE_ERRORS = {
    RESOURCE_NOT_FOUND: {
      code: 4001,
      message: 'The requested resource was not found.',
    },
    RESOURCE_ALREADY_EXISTS: {
      code: 4002,
      message: 'The resource already exists.',
    },
    INVALID_RESOURCE_ID: {
      code: 4003,
      message: 'Invalid resource ID provided.',
    },
    RESOURCE_UPDATE_FAILED: {
      code: 4004,
      message: 'Failed to update the resource.',
    },
    RESOURCE_DELETION_FAILED: {
      code: 4005,
      message: 'Failed to delete the resource.',
    },
  };
  
  module.exports = RESOURCE_ERRORS