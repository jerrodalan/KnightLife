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

export class UsersController {
  constructor(
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

  @authenticate('JWT')
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
  async findById(@param.path.string('id') id: string): Promise<Users> {
    return await this.usersRepository.findById(id);
  }

  @patch('/users/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() Users: Users
  ): Promise<boolean> {
    return await this.usersRepository.updateById(id, Users);
  }

  @del('/users/{id}')
  async deleteById(@param.path.string('id') id: string): Promise<boolean> {
    return await this.usersRepository.deleteById(id);
  }
}
