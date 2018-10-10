import {Entity, model, property} from '@loopback/repository';

@model()
export class Profile extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

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
