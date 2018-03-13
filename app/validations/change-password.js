import validatePassword from '../validators/password';

export default {
  password: validatePassword(),
  passwordConfirm: validatePassword(),
};
