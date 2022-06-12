import { BadRequestError } from 'routing-controllers';

export class SeatsCountIsNotEvenError extends BadRequestError {
  constructor(count: number) {
    super(`Seats count should be even. Received ${count} amount of seats`);
  }
}
