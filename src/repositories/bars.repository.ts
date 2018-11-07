import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Bar } from '../models';
import { inject } from '@loopback/context';
import { MongoDsDataSource } from '../datasources';

export class BarsRepository extends DefaultCrudRepository<Bar, typeof Bar.prototype.id>{
  constructor(
    @inject('datasources.mongoDs') protected datasource: MongoDsDataSource, ) {
    super(Bar, datasource);
  }
}
