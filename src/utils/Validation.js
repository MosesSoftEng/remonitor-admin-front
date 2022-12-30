import { EMAIL_PATTERN_VALIDATION, PASSWORD_PATTERN_VALIDATION } from "../environments/env";

/**
 * IsEmailInValid - function to chec kif email is invalid.
 * @param {*} email 
 * @returns true if email is invalid, otherwise false
 */
const IsEmailInValid = function (email) {
  return !EMAIL_PATTERN_VALIDATION.test(email);
};

/**
 * IsEmailInValid - function to chec kif email is invalid.
 * @param {*} password 
 * @returns true if password is invalid, otherwise false
 */
const IsPasswordInValid = function (password) {
  return !PASSWORD_PATTERN_VALIDATION.test(password);
};

export {
  IsEmailInValid, IsPasswordInValid
}
