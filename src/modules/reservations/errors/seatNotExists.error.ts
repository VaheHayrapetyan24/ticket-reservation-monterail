import { NotFoundError } from 'routing-controllers';

export class SeatNotExistsError extends NotFoundError {
  constructor(aisle: number, row: number, seat: number, venueConfigurationId: string) {
    super(
      `Seat in position: Aisle - ${aisle}, Row - ${row}, Seat - ${seat} does not exist in venue ${venueConfigurationId}`,
    );
  }
}
