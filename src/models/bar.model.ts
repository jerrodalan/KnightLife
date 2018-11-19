import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';

@model()
export class Bar extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: ObjectId;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'string',
  })
  PhoneNumber?: string;

  @property({
    type: 'string',
  })
  Website?: string;

  @property({
    type: 'string',
  })
  Description?: string;

  @property({
    type: 'string',
  })
  Culture?: string;

  constructor(data?: Partial<Bar>) {
    super(data);
  }
}
