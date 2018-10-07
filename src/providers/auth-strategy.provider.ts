import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Filter, Where, repository, FilterBuilder } from '@loopback/repository';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { BasicStrategy } from 'passport-http';
import { UsersRepository } from '../repositories';
import { Users } from '../models';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA) private metadata: AuthenticationMetadata,
    @repository(UsersRepository) public usersRepository: UsersRepository
  ) { }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    }
    else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify = (
    username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) => {

    //if (username === 'jerrodcrook') cb(null, { id: '1' });
    // else cb(null, false);

    this.findByUsername(username).then((result: Users) => {
      if (result !== null && result.Password === password) {
        cb(null, { id: result.id });
      }
      else {
        cb(null, false);
      }
    });
    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
  }

  async findByUsername(username: string) {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder.fields('Username').where({ Username: username }).build();
    return await this.usersRepository.findOne(filter);
  }
}
