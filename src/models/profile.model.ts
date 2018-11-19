import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';

@model()
export class Profile extends Entity {
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
  Gender: string;

  @property({
    type: 'string',
    required: true,
  })
  Birthday: string;

  @property({
    type: 'string',
    required: true,
  })
  PreferredDrink: string;

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}
