import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import { inject } from '@loopback/core';
import { AuthenticationBindings, UserProfile, authenticate } from '@loopback/authentication';
import { sign } from "jsonwebtoken";

export class AuthController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, { optional: true }) private user: UserProfile
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

}
