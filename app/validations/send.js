import validateAccount from '../validators/account';
import validateAmount from '../validators/amount';

export default {
  destination: validateAccount(),
  amount: validateAmount(),
};
