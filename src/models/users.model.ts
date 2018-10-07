import { Entity, model, property } from '@loopback/repository';
import { UserProfile } from '@loopback/authentication';

@model()
export class Users extends Entity implements UserProfile {
  @property({
    type: 'string',
    required: true,
  })
  Username: string;

  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

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
