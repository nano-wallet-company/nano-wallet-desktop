import Controller from '@ember/controller';

export default class SetupImportController extends Controller {
  queryParams = ['type'];

  type = 'seed';
}
