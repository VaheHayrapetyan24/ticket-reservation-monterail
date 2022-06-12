import { NotFoundError } from 'routing-controllers';

export class AisleNotExistsError extends NotFoundError {
  constructor(aisle: number, venueConfigurationId: string) {
    super(`Aisle: ${aisle} does not exist in venue ${venueConfigurationId}`);
  }
}
