import { BadRequestError } from 'routing-controllers';

export class InvalidPasswordError extends BadRequestError {
  constructor() {
    super('Password is not valid');
  }
}
