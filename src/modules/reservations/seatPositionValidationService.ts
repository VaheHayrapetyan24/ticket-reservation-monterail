import { CreateReservationDto } from './dto/createReservation.dto';
import { SeatsCountIsNotEvenError } from './errors/seatsCountIsNotEven.error';
import { SeatsAreNotNextToEachOtherError } from './errors/seatsAreNotNextToEachOther.error';
import { InternalServerError } from 'routing-controllers';
import { Service } from 'typedi';
import { VenueConfiguration } from '../../mocks/venueConfiguration.mock';
import { SeatNotExistsError } from './errors/seatNotExists.error';
import { AisleNotExistsError } from './errors/aisleNotExists.error';

// this maps the seat identifier string to isVisited by validator algorithm
type SeatsMap = Map<string, boolean>;

interface SeatPosition {
  row: number;
  seat: number;
}

@Service()
export class SeatPositionValidationService {
  getSeatsMap(reservationDto: CreateReservationDto): SeatsMap {
    const map: SeatsMap = new Map();
    for (const seat of reservationDto.seats) {
      map.set(this.getSeatIdentifierString(seat), false);
    }
    return map;
  }

  async validateSeatPositionsInVenue({ aisle, seats, venueConfigurationId }: CreateReservationDto): Promise<void> {
    const venueConfiguration = await VenueConfiguration.getConfigurationById(venueConfigurationId);
    const aisleConfiguration = venueConfiguration.aisles[aisle - 1];
    if (!aisleConfiguration) {
      throw new AisleNotExistsError(aisle, venueConfigurationId);
    }
    for (const seat of seats) {
      if (seat.row > aisleConfiguration.rowCount || seat.seat > aisleConfiguration.seatCount) {
        throw new SeatNotExistsError(aisle, seat.row, seat.seat, venueConfigurationId);
      }
    }
  }

  validateSeatsDistribution(reservationDto: CreateReservationDto): void {
    const seatsMap = this.getSeatsMap(reservationDto);
    if (seatsMap.size % 2 !== 0) {
      throw new SeatsCountIsNotEvenError(seatsMap.size);
    }
    // just get the first seat id to start the recursive check
    const firstSeatId = this.getSeatIdentifierString(reservationDto.seats[0]);
    this.visitSeat(firstSeatId, seatsMap);
    for (const isVisited of seatsMap.values()) {
      // if there are any seats that we haven't visited means at least one is not next to the others
      if (!isVisited) {
        throw new SeatsAreNotNextToEachOtherError();
      }
    }
  }

  // mutates seatsMap
  visitSeat(identifier: string, seatsMap: SeatsMap): void {
    // already visited this seat
    if (seatsMap.get(identifier)) {
      return;
    }
    // visit this seat
    seatsMap.set(identifier, true);
    const { row, seat } = this.getSeatPositionFromIdentifier(identifier);
    const up = { row: row + 1, seat };
    const down = { row: row - 1, seat };
    const right = { row, seat: seat + 1 };
    const left = { row, seat: seat - 1 };
    this.visitSeatInAllowedRange(up, seatsMap);
    this.visitSeatInAllowedRange(down, seatsMap);
    this.visitSeatInAllowedRange(right, seatsMap);
    this.visitSeatInAllowedRange(left, seatsMap);
  }

  visitSeatInAllowedRange(position: SeatPosition, seatsMap: SeatsMap): void {
    if (this.isSeatInAllowedRange(position, seatsMap)) {
      this.visitSeat(this.getSeatIdentifierString(position), seatsMap);
    }
  }

  isSeatInAllowedRange({ row, seat }: SeatPosition, seatsMap: SeatsMap): boolean {
    if (row < 1 || seat < 1) {
      return false;
    }
    const identifier = this.getSeatIdentifierString({ row, seat });
    return seatsMap.has(identifier);
  }

  getSeatIdentifierString({ row, seat }: SeatPosition): string {
    return `${row}_${seat}`;
  }

  // prefer interfaces to type aliases wherever possible because aliases increase ts compile time
  getSeatPositionFromIdentifier(identifier: string): SeatPosition {
    const [row, seat] = identifier.split('_');
    const parsedRow = parseInt(row);
    const parsedSeat = parseInt(seat);
    // this should never happen, but just in case. the numbers are also > 0 so the check is correct
    if (!parsedRow || !parsedSeat) {
      throw new InternalServerError('Got unknown mapping of seat identifier');
    }
    return { row: parsedRow, seat: parsedSeat };
  }
}
