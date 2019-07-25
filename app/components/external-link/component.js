import Component from '@ember/component';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { inject as service } from '@ember/service';
import { tagName, attribute } from '@ember-decorators/component';

import window from 'ember-window-mock';

@tagName('a')
class ExternalLinkComponent extends Component {
  @service electron;

  @attribute href = null;

  text = null;

  click() {
    const { href, electron } = this.getProperties(['href', 'electron']);
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      electron.openExternal(href);
      return false;
    }

    tryInvoke(window, 'open', [href]);
    return false;
  }
}

export default ExternalLinkComponent;
