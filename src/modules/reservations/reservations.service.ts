import {Inject, Service} from 'typedi';
import {BaseEntityService} from '../base/baseEntity.service';
import {EntityManager, getRepository, In, MoreThan} from 'typeorm';
import {Reservations, ReservationStatus} from './reservations.entity';
import {EventsService} from '../events/events.service';
import {CreateReservationDto} from './dto/createReservation.dto';
import {SeatPositionValidationService} from './seatPositionValidationService';
import config from "../../config";

@Service()
export class ReservationsService extends BaseEntityService<Reservations> {
  @Inject()
  private eventsService: EventsService;
  @Inject()
  private seatPositionValidationService: SeatPositionValidationService;

  constructor() {
    super();
    this.repository = getRepository(Reservations);
    this.repositoryClass = Reservations;
  }

  async create(reservationDto: CreateReservationDto) {}

  async validateReservation(reservationDto: CreateReservationDto, manager?: EntityManager) {
    this.seatPositionValidationService.validateSeatsDistribution(reservationDto);
    await this.seatPositionValidationService.validateSeatPositionsInVenue(reservationDto);
    await this.eventsService.findOneUnsafe({
      id: reservationDto.eventId,
      venueConfigurationId: reservationDto.venueConfigurationId,
    });
  }

  async validateReservationAvailability(reservationDto: CreateReservationDto, manager?: EntityManager) {
    const seatPositions = reservationDto.seats.map(s => ({
      row: s.row,
      seat: s.seat,
      aisle: reservationDto.aisle,
    }));
    await this.getRepository(manager).find({
      where: qb => {
        qb.where([
          {
            event: { id: reservationDto.eventId },
            status: In([ReservationStatus.PAYMENT_PROCESSING, ReservationStatus.PAYMENT_SUCCESSFUL]),
          },
          {
            event: { id: reservationDto.eventId },
            status: ReservationStatus.RESERVED,
            reservedAt: MoreThan(this.getReservationStartDate()),
          },
        ]).andWhere({

        });
      },
    });
  }

  getReservationStartDate() {
    const now = new Date();
    return new Date(now.getTime() - config.reservationTimeout);
  }
}
