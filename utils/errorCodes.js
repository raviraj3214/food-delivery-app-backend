const AUTH_ERRORS = require('../errors/authErrors')
const FILE_ERRORS = require('../errors/fileErrors')
const GENERAL_ERRORS = require('../errors/generalErrors')
const PAYMENT_ERRORS = require('../errors/paymentErrors')
const RESOURCE_ERRORS = require('../errors/resourceErrors')
const SERVER_ERRORS = require('../errors/serverErrors')
const USER_ERRORS = require('../errors/userErrors')
const VALIDATION_ERRORS = require('../errors/validationErrors')

const ERROR_CODES = {
    ...AUTH_ERRORS,
    ...FILE_ERRORS,
    ...GENERAL_ERRORS,
    ...PAYMENT_ERRORS,
    ...RESOURCE_ERRORS,
    ...SERVER_ERRORS,
    ...USER_ERRORS,
    ...VALIDATION_ERRORS,
};
module.exports = ERROR_CODES