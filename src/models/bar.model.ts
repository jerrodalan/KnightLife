import {Entity, model, property} from '@loopback/repository';

@model()
export class Bar extends Entity {
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
