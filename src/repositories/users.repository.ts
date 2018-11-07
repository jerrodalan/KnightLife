import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Users } from '../models';
import { inject } from '@loopback/core';
import { MongoDsDataSource } from '../datasources';

export class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id>{
  constructor(
    @inject('datasources.mongoDs') protected datasource: MongoDsDataSource, ) {
    super(Users, datasource);
  }
}

