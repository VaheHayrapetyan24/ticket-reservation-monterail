import { BadRequestError } from 'routing-controllers';

export class TicketsAlreadyReservedError extends BadRequestError {
  constructor(ticketIds: number[]) {
    super(`Tickets with ids: ${ticketIds.join(', ')} already reserved`);
  }
}
