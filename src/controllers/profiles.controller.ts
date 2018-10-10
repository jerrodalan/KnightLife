import {Filter, Where, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {Profile} from '../models';
import {ProfilesRepository} from '../repositories';

export class ProfilesController {
  constructor(
    @repository(ProfilesRepository)
    public profilesRepository : ProfilesRepository,
  ) {}

  @post('/profiles', {
    responses: {
      '200': {
        description: 'Profile model instance',
        content: {'application/json': {'x-ts-type': Profile}},
      },
    },
  })
  async create(@requestBody() profiles: Profile)
    : Promise<Profile> {
    return await this.profilesRepository.create(profiles);
  }

  @get('/profiles/count', {
    responses: {
      '200': {
        description: 'Profile model count',
        content: {'application/json': {'x-ts-type': Number}},
      },
    },
  })
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.profilesRepository.count(where);
  }

  @get('/profiles', {
    responses: {
      '200': {
        description: 'Array of Profile model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Profile}},
          },
        },
      },
    },
  })
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Profile[]> {
    return await this.profilesRepository.find(filter);
  }

  @patch('/profiles', {
    responses: {
      '200': {
        description: 'Profile PATCH success count',
        content: {'application/json': {'x-ts-type': Number}},
      },
    },
  })
  async updateAll(
    @requestBody() profiles: Profile,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.profilesRepository.updateAll(profiles, where);
  }

  @get('/profiles/{id}', {
    responses: {
      '200': {
        description: 'Profile model instance',
        content: {'application/json': {'x-ts-type': Profile}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Profile> {
    return await this.profilesRepository.findById(id);
  }

  @patch('/profiles/{id}', {
    responses: {
      '200': {
        description: 'Profile PATCH success',
        content: {'application/json': {'x-ts-type': Boolean}},
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() profiles: Profile
  ): Promise<boolean> {
    return await this.profilesRepository.updateById(id, profiles);
  }

  @del('/profiles/{id}', {
    responses: {
      '200': {
        description: 'Profile DELETE success',
        content: {'application/json': {'x-ts-type': Boolean}},
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.profilesRepository.deleteById(id);
  }
}
