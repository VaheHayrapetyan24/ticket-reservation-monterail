import { Inject, Service } from 'typedi';
import { BaseEntityService } from '../base/baseEntity.service';
import { DeepPartial, EntityManager, Repository, getRepository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { EventsService } from '../events/events.service';
import {CreateReservationDto} from "./dto/createReservation.dto";
import {InternalServerError} from "routing-controllers";
import {SeatsCountIsNotEvenError} from "./errors/seatsCountIsNotEven.error";
import {SeatsAreNotNextToEachOtherError} from "./errors/seatsAreNotNextToEachOther.error";
import {SeatPositionValidationService} from "./seatPositionValidationService";



@Service()
export class ReservationsService extends BaseEntityService<Reservation> {
  @Inject()
  private eventsService: EventsService;
  @Inject()
  private seatPositionValidationService: SeatPositionValidationService;

  constructor() {
    super();
    this.repository = getRepository(Reservation);
    this.repositoryClass = Reservation;
  }

  async create(reservationDto: CreateReservationDto) {

  }

  async validateReservation(reservationDto: CreateReservationDto, manager?: EntityManager) {
    this.seatPositionValidationService.validateSeatsDistribution(reservationDto);
    await this.seatPositionValidationService.validateSeatPositionsInVenue(reservationDto);

  }



}
