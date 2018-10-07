import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Bar } from '../models';
import { inject } from '@loopback/core';

export class BarsRepository extends DefaultCrudRepository<Bar, typeof Bar.prototype.id>{
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource, ) {
    super(Bar, datasource);
  }
}