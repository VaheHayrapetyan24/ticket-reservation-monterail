import { Inject, Service } from 'typedi';
import { BaseEntityService } from '../base/baseEntity.service';
import { DeepPartial, EntityManager, Repository, getRepository } from 'typeorm';
import { Event } from "./event.entity";

@Service()
export class EventsService extends BaseEntityService<Event> {
  constructor() {
    super();
    this.repository = getRepository(Event);
    this.repositoryClass = Event;
  }
}
