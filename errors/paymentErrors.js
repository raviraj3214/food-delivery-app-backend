const PAYMENT_ERRORS = {
    PAYMENT_FAILED: {
      code: 8001,
      message: 'The payment process failed. Please try again.',
    },
    INVALID_PAYMENT_METHOD: {
      code: 8002,
      message: 'The selected payment method is not valid.',
    },
    INSUFFICIENT_FUNDS: {
      code: 8003,
      message: 'You have insufficient funds to complete the transaction.',
    },
    PAYMENT_REFUND_FAILED: {
      code: 8004,
      message: 'Failed to process the refund. Please contact support.',
    },
  };
  module.exports = PAYMENT_ERRORS
  