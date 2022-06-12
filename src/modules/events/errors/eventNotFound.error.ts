import { NotFoundError } from 'routing-controllers';

export class EventNotFoundError extends NotFoundError {
  constructor(id: number) {
    super(`Event with id: ${id} not found`);
  }
}
