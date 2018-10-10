import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Profile } from '../models';
import { inject } from '@loopback/core';

export class ProfilesRepository extends DefaultCrudRepository<Profile, typeof Profile.prototype.id>{
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource, ) {
    super(Profile, datasource);
  }
}