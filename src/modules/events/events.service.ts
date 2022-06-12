import { Inject, Service } from 'typedi';
import { BaseEntityService } from '../base/baseEntity.service';
import { DeepPartial, EntityManager, Repository, getRepository } from 'typeorm';
import { Event } from './event.entity';
import { EventNotFoundError } from './errors/eventNotFound.error';

@Service()
export class EventsService extends BaseEntityService<Event> {
  constructor() {
    super();
    this.repository = getRepository(Event);
    this.repositoryClass = Event;
  }

  public async getAll(): Promise<Event[]> {
    const events = await this.getRepository().find();
    return events;
  }

  private async findOneUnsafe(
    params: DeepPartial<Event>,
    manager?: EntityManager,
  ): Promise<Event> {
    const user = await this.findOneSafe(params, manager);
    if (!user) {
      throw new EventNotFoundError(params.id);
    }
    return user;
  }
}
