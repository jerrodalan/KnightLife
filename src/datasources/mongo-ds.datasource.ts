import { inject } from '@loopback/core';
import { juggler, AnyObject } from '@loopback/repository';
const config = require('./mongo-ds.datasource.json');

export class MongoDsDataSource extends juggler.DataSource {
  static dataSourceName = 'mongoDs';

  constructor(
    @inject('datasources.config.mongoDs', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(dsConfig);
  }
}
