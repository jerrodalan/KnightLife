import { Filter, Where, repository, FilterBuilder } from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import { Users } from '../models';
import { UsersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ObjectId } from 'bson';

export class UsersController {
  constructor(
    @repository(UsersRepository) public usersRepository: UsersRepository,
  ) { }

  @authenticate('JWT')
  @get('/users/count')
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.usersRepository.count(where);
  }

  @authenticate('JWT')
  @get('/users')
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Users[]> {
    return await this.usersRepository.find(filter);
  }
}
