// validators/studentValidator.js
const yup = require('yup');

const studentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required').notOneOf([yup.ref('alternate_email')], 'Email should not be the same as alternate email'),
  alternate_email: yup.string().email('Invalid alternate email').required('Alternate email is required'),
  phone: yup.string().required('Phone is required'),
  alternate_phone: yup.string().required('Alternate phone is required').notOneOf([yup.ref('phone')], 'Phone numbers should not be the same'),
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),

  // Parent details validation
  parent_name: yup.string().required('Parent name is required'),
  job_name: yup.string().required('Job name is required'),
  salary: yup.number().required('Salary is required').positive('Salary must be positive'),
});

module.exports = studentSchema;
