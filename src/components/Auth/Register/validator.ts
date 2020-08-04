import { IRegisterState } from './index';

export default ({ username, email, password, confirmPassword }: IRegisterState) => {
  const errors: IRegisterState = { username: '', email: '', password: '', confirmPassword: '' };
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if (!username) {
    errors.username = 'Required';
  }
  if (!email) {
    errors.email = 'Required';
  } else if (!email.match(regEx)) {
    errors.email = 'Please ensure a valid email is submitted';
  }
  if (!password) {
    errors.password = 'Required';
  } else if (!(password.length > 5)) {
    errors.password = 'Password must be 6 characters or more';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password and confirmation must much';
  }

  const isValid = !Object.values(errors).some((v) => v);

  return { errors, isValid };
};
