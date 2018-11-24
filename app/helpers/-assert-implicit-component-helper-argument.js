import { warn } from '@ember/debug';
import { helper } from '@ember/component/helper';

const name = '-assert-implicit-component-helper-argument';

const helperFn = {
  [name](params) {
    const [node, error] = params;
    warn(error);
    return node;
  },
}[name];

export default helper(helperFn);
