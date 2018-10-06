import { Filter, Where, repository } from '@loopback/repository';
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
import { AuthenticationBindings, UserProfile, authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

export class UsersController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, { optional: true }) private user: UserProfile,
    @repository(UsersRepository) public usersRepository: UsersRepository,
  ) { }

  @post('/users')
  async create(@requestBody() Users: Users)
    : Promise<Users> {
    return await this.usersRepository.create(Users);
  }

  @get('/users/count')
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.usersRepository.count(where);
  }

  @authenticate('BasicStrategy')
  @get('/users')
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Users[]> {
    return await this.usersRepository.find(filter);
  }

  @patch('/users')
  async updateAll(
    @requestBody() Users: Users,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.usersRepository.updateAll(Users, where);
  }

  @get('/users/{id}')
  async findById(@param.path.number('id') id: number): Promise<Users> {
    return await this.usersRepository.findById(id);
  }

  @patch('/users/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() Users: Users
  ): Promise<boolean> {
    return await this.usersRepository.updateById(id, Users);
  }

  @del('/users/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.usersRepository.deleteById(id);
  }
}
