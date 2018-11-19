import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Filter, Where, repository, FilterBuilder } from '@loopback/repository';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import { BasicStrategy } from 'passport-http';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from '../repositories';
import { Users } from '../models';
import { ObjectId } from 'bson';
import { compare } from 'bcrypt'

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA) private metadata: AuthenticationMetadata,
    @repository(UsersRepository) public usersRepository: UsersRepository
  ) { }

  value(): ValueOrPromise<Strategy | undefined> {
    const self = this;
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    }
    else if (name === 'JWT') {
      return new JWTStrategy({
        secretOrKey: 'your_jwt_secret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      }, function (jwtPayload, cb) {
        return self.findById(jwtPayload.id).then((result: Users) => {
          if (result) {
            return cb(null, result);
          }
          else {
            return cb(null, false);
          }
        })
      });
    }
    else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify = (
    username: string,
    password: string,
    cb: (err: Error | null, user?: Users | false) => void,
  ) => {

    this.findByUsername(username).then((result: Users) => {
      if (result !== null && this.comparePassword(password, result.Password)) {
        cb(null, result);
      }
      else {
        cb(null, false);
      }
    });
  }

  async findByUsername(username: string) {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder.where({ Username: username }).build();
    return await this.usersRepository.findOne(filter);
  }

  async findById(id: ObjectId): Promise<Users> {
    return await this.usersRepository.findById(id);
  }

  private comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
