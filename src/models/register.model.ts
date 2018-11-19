import { Entity, model, property } from '@loopback/repository';

@model()
export class Register extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Username: string;

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

  constructor(data?: Partial<Register>) {
    super(data);
  }
}
