import { NotFoundError } from 'routing-controllers';

export class UserNotFoundError extends NotFoundError {
  constructor(email?: string) {
    if (!email) {
      super();
      return;
    }
    super(`User with email: ${email} not found`);
  }
}
