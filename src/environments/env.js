/**
 * Module for Global variables.
 */

const DEV_STAGE = 'dev';

// Named exports
const APP_NAME = 'Remonitor';
const API_URL = 'http://localhost:3003';
// const API_URL = 'https://edxwj7m3we.execute-api.us-east-1.amazonaws.com/dev';
const EMAIL_PATTERN_VALIDATION = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_PATTERN_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export {
  DEV_STAGE,
  APP_NAME,
  API_URL,
  EMAIL_PATTERN_VALIDATION,
  PASSWORD_PATTERN_VALIDATION
};
