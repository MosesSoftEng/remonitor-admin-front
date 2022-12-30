import { EMAIL_PATTERN_VALIDATION, PASSWORD_PATTERN_VALIDATION } from "../environments/env";

/**
 * IsEmailInValid - function to chec kif email is invalid.
 * @param {string} email email to check.
 * @returns true if email is invalid, otherwise false
 */
const IsEmailInValid = function IsEmailInValid(email) {
  return !EMAIL_PATTERN_VALIDATION.test(email);
};

/**
 * IsEmailInValid - function to chec kif email is invalid.
 * @param {string} password password to check
 * @returns true if password is invalid, otherwise false
 */
const IsPasswordInValid = function IsPasswordInValid(password) {
  return !PASSWORD_PATTERN_VALIDATION.test(password);
};

export {
  IsEmailInValid,
  IsPasswordInValid,
};
