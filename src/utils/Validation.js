import { EMAIL_PATTERN_VALIDATION } from "../environments/env";

/**
 * IsEmailInValid - function to chec kif email is invalid.
 * @param {*} email 
 * @returns true if email is invalid, otherwise true
 */
const IsEmailInValid = function (email) {
  return !EMAIL_PATTERN_VALIDATION.test(email);
};

export {
  IsEmailInValid
}
