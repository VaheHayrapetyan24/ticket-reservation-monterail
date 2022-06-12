import { Service } from 'typedi';
import { BaseEntityService } from '../base/baseEntity.service';
import { DeepPartial, EntityManager, getRepository } from 'typeorm';
import { Events } from './events.entity';
import { EventNotFoundError } from './errors/eventNotFound.error';

@Service()
export class EventsService extends BaseEntityService<Events> {
  constructor() {
    super();
    this.repository = getRepository(Events);
    this.repositoryClass = Events;
  }

  public async getAll(): Promise<Events[]> {
    const events = await this.getRepository().find();
    return events;
  }

  async findOneUnsafe(
    params: DeepPartial<Events>,
    manager?: EntityManager,
  ): Promise<Events> {
    const user = await this.findOneSafe(params, manager);
    if (!user) {
      throw new EventNotFoundError(params.id);
    }
    return user;
  }
}
