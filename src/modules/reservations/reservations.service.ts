import { Inject, Service } from 'typedi';
import { BaseEntityService } from '../base/baseEntity.service';
import { EntityManager, getRepository, In, MoreThan } from 'typeorm';
import { Reservations, ReservationStatus } from './reservations.entity';
import { EventsService } from '../events/events.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { TicketsService } from '../tickets/tickets.service';
import config from '../../config';
import { TicketsAlreadyReservedError } from '../tickets/errors/ticketsAlreadyReserved.error';
import { Users } from '../users/users.entity';
import { PaymentService } from '../../mocks/payment/paymentService.mock';

@Service()
export class ReservationsService extends BaseEntityService<Reservations> {
  @Inject()
  private eventsService: EventsService;
  @Inject()
  private ticketsService: TicketsService;
  @Inject()
  private paymentService: PaymentService;

  constructor() {
    super();
    this.repository = getRepository(Reservations);
    this.repositoryClass = Reservations;
  }

  async create(reservationDto: CreateReservationDto, user: Users) {
    await this.transaction(null, async manager => {
      const event = await this.eventsService.findOneUnsafe({
        id: reservationDto.eventId,
      });
      const seatPositions = this.ticketsService.getUniqueSeatsPositions(reservationDto.seats);
      await this.validateReservation(reservationDto, seatPositions, event.venueConfigurationId, manager);
      const invoiceId = await this.paymentService.createInvoice();
      const insertResult = await this.getRepository(manager).insert({
        event,
        reservedAt: new Date().toString(),
        status: ReservationStatus.RESERVED,
        invoiceId,
        user,
      });
      await this.ticketsService.updateTicketsReservations(
        seatPositions,
        { id: insertResult.identifiers[0].id } as Reservations,
        manager,
      );
    });
  }

  async validateReservation(
    reservationDto: CreateReservationDto,
    seatPositions: string[],
    venueConfigurationId: string,
    manager?: EntityManager,
  ) {
    this.ticketsService.validateSeatsDistribution(reservationDto);
    await this.ticketsService.validateSeatPositionsInVenue(reservationDto, venueConfigurationId);
    await this.validateReservationAvailability(reservationDto, manager);
  }

  async validateReservationAvailability(reservationDto: CreateReservationDto, manager?: EntityManager): Promise<void> {
    const seatPositions = this.ticketsService.getUniqueSeatsPositions(reservationDto.seats);
    const reservations = await this.getRepository(manager).find({
      relations: ['tickets'],
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
        ]).andWhere('Reservations__tickets.position IN (:...positions)', { positions: seatPositions });
      },
    });
    const reservedTicketIds: number[] = [];
    reservations.forEach(r => reservedTicketIds.push(...r.tickets.map(t => t.id)));
    if (reservations.length) {
      throw new TicketsAlreadyReservedError(reservedTicketIds);
    }
  }

  async updateStatus(invoiceId: string, status: ReservationStatus): Promise<void> {
    await this.getRepository().update({ invoiceId }, { status });
  }

  getReservationStartDate(): Date {
    const now = new Date();
    return new Date(now.getTime() - config.reservationTimeout);
  }
}
