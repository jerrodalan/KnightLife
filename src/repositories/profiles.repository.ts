import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Profile } from '../models';
import { inject } from '@loopback/core';
import { MongoDsDataSource } from '../datasources';

export class ProfilesRepository extends DefaultCrudRepository<Profile, typeof Profile.prototype.id>{
  constructor(
    @inject('datasources.mongoDs') protected datasource: MongoDsDataSource, ) {
    super(Profile, datasource);
  }
}
