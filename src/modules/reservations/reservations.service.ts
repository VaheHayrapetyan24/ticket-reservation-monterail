import { Inject, Service } from 'typedi';
import { BaseEntityService } from '../base/baseEntity.service';
import { DeepPartial, EntityManager, Repository, getRepository } from 'typeorm';
import { Reservation } from "./reservation.entity";

@Service()
export class ReservationsService extends BaseEntityService<Reservation> {
  constructor() {
    super();
    this.repository = getRepository(Reservation);
    this.repositoryClass = Reservation;
  }
}
