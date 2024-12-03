const FILE_ERRORS = {
    FILE_TOO_LARGE: {
      code: 7001,
      message: 'The uploaded file exceeds the allowed size limit.',
    },
    UNSUPPORTED_FILE_TYPE: {
      code: 7002,
      message: 'The uploaded file type is not supported.',
    },
    FILE_UPLOAD_FAILED: {
      code: 7003,
      message: 'Failed to upload the file. Please try again.',
    },
    FILE_NOT_FOUND: {
      code: 7004,
      message: 'No file was uploaded or the file could not be found.',
    },
  };
  module.exports = FILE_ERRORS
  