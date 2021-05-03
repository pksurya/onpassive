const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.number = !isEmpty(data.number) ? data.number : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email Id is Required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};