import Component from '@ember/component';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { service } from '@ember-decorators/service';
import { tagName, attribute } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

import window from 'ember-window-mock';

@tagName('a')
class ExternalLinkComponent extends Component {
  @service electron = null;

  @attribute href = null;

  @argument text = null;

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
