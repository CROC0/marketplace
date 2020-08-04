import { ILoginState } from './index';

export default (values: ILoginState) => {
  const errors: ILoginState = { email: '', password: '' };
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if (!values.email) {
    errors.email = 'Required';
  } else if (!values.email.match(regEx)) {
    errors.email = 'Please ensure a valid email is submitted';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!(values.password.length > 5)) {
    errors.password = 'Password must be 6 characters or more';
  }
  const isValid = !Object.values(errors).some((v) => v);

  return { errors, isValid };
};
