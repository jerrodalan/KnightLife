import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Username: string;

  @property({
    type: 'string',
    id: true,
    required: true
  })
  id: ObjectId;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}
