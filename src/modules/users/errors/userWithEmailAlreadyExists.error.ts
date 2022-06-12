import { BadRequestError } from 'routing-controllers';

export class UserWithEmailAlreadyExistsError extends BadRequestError {
  constructor(email: string) {
    super(`User with email: ${email} already exists`);
  }
}
