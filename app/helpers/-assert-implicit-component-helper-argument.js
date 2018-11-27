import { warn } from '@ember/debug';
import { helper } from '@ember/component/helper';

function helperFn(params) {
  const [node, error] = params;
  warn(error);
  return node;
}

// https://github.com/emberjs/ember.js/issues/17154
Object.defineProperty(helperFn, 'name', {
  value: '-assert-implicit-component-helper-argument',
});

export default helper(helperFn);
