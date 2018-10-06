import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Users } from '../models';
import { inject } from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id>{
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource, ) {
    super(Users, datasource);
  }
}

