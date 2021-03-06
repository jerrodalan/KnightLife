import { Filter, Where, repository } from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import { Bar } from '../models';
import { BarsRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { MongoDsDataSource } from '../datasources';
import { ObjectId } from 'bson';

export class BarsController {
  constructor(
    @inject('datasources.mongoDs') protected datasource: MongoDsDataSource,
    @repository(BarsRepository) public barsRepository: BarsRepository
  ) { }

  @authenticate('JWT')
  @post('/bars', {
    responses: {
      '200': {
        description: 'Bar model instance',
        content: { 'application/json': { 'x-ts-type': Bar } },
      },
    },
  })
  async create(@requestBody() bars: Bar)
    : Promise<Bar> {
    return await this.barsRepository.create(bars);
  }

  @authenticate('JWT')
  @get('/bars/count', {
    responses: {
      '200': {
        description: 'Bar model count',
        content: { 'application/json': { 'x-ts-type': Number } },
      },
    },
  })
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.barsRepository.count(where);
  }

  @authenticate('JWT')
  @get('/bars', {
    responses: {
      '200': {
        description: 'Array of Bar model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Bar } },
          },
        },
      },
    },
  })
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Bar[]> {
    return await this.barsRepository.find(filter);
  }

  @authenticate('JWT')
  @patch('/bars', {
    responses: {
      '200': {
        description: 'Bar PATCH success count',
        content: { 'application/json': { 'x-ts-type': Number } },
      },
    },
  })
  async updateAll(
    @requestBody() bars: Bar,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.barsRepository.updateAll(bars, where);
  }

  @authenticate('JWT')
  @get('/bars/{id}', {
    responses: {
      '200': {
        description: 'Bar model instance',
        content: { 'application/json': { 'x-ts-type': Bar } },
      },
    },
  })
  async findById(@param.path.number('id') id: ObjectId): Promise<Bar> {
    return await this.barsRepository.findById(id);
  }

  @authenticate('JWT')
  @patch('/bars/{id}', {
    responses: {
      '200': {
        description: 'Bar PATCH success',
        content: { 'application/json': { 'x-ts-type': Boolean } },
      },
    },
  })
  async updateById(
    @param.path.number('id') id: ObjectId,
    @requestBody() bars: Bar
  ): Promise<boolean> {
    return await this.barsRepository.updateById(id, bars);
  }

  @authenticate('JWT')
  @del('/bars/{id}', {
    responses: {
      '200': {
        description: 'Bar DELETE success',
        content: { 'application/json': { 'x-ts-type': Boolean } },
      },
    },
  })
  async deleteById(@param.path.number('id') id: ObjectId): Promise<boolean> {
    return await this.barsRepository.deleteById(id);
  }
}
