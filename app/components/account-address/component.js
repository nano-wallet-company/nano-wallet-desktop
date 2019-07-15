import Component from '@ember/component';
import { bool } from '@ember/object/computed';

import { on, observes } from '@ember-decorators/object';
import { tagName, attribute } from '@ember-decorators/component';

import toNanoPrefix from '../../utils/to-nano-prefix';

export const MINIMUM_LENGTH = 65;

@tagName('span')
class AccountAddressComponent extends Component {
  @bool('value') isVisible;

  @attribute title = null;

  @attribute translate = false;

  value = null;

  truncate = 0;

  head = null;

  body = null;

  tail = null;

  @on('didInsertElement')
  setupParts() {
    this.valueDidChange();
  }

  @observes('value')
  valueDidChange() {
    const value = this.get('value');
    if (value) {
      const str = toNanoPrefix(value);
      if (str.length >= MINIMUM_LENGTH) {
        const head = str.slice(0, 10);
        const body = str.slice(10, -5);
        const tail = str.slice(-5);
        this.setProperties({ head, body, tail });
      }
    }
  }
}

export default AccountAddressComponent;
