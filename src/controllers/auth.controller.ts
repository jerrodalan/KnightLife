import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import { inject } from '@loopback/core';
import { AuthenticationBindings, authenticate } from '@loopback/authentication';
import { sign } from "jsonwebtoken";
import { Users } from '../models';
import { UsersRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Register } from '../models/register.model';

export class AuthController {
  constructor(
    @repository(UsersRepository) public usersRepository: UsersRepository,
    @inject(AuthenticationBindings.CURRENT_USER, { optional: true }) private user: Users
  ) { }

  @authenticate('BasicStrategy')
  @get('/login', {
    responses: {
      '200': {
        description: 'auth token',
        content: { 'application/json': { 'x-ts-type': String } },
      },
    }
  })
  async login() {
    const token = sign({ id: this.user.id }, 'your_jwt_secret', {
      expiresIn: '1h'
    });
    return await token;
  }

  @post('/register')
  async register(@requestBody() register: Register) {
    let user = <Users>{ id: new ObjectId, Username: register.Username, Password: register.Password, Email: register.Email };
    this.usersRepository.create(user);
  }

}
