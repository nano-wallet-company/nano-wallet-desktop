import Component from '@ember/component';

import { on, observes } from '@ember-decorators/object';
import { bool } from '@ember-decorators/object/computed';
import { tagName, attribute } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

import toMikPrefix from '../../utils/to-mik-prefix';

export const MINIMUM_LENGTH = 64;

@tagName('span')
class AccountAddressComponent extends Component {
  @bool('value') isVisible = false;

  @attribute title = null;

  @attribute translate = false;

  @argument value = null;

  @argument truncate = 0;

  head = null;

  body = null;

  tail = null;

  @on('didInsertElement')
  @observes('value')
  valueDidChange() {
    const value = this.get('value');
    if (value) {
      const str = toMikPrefix(value);
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
