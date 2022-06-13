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
    return this.getRepository().find();
  }

  async findOneUnsafe(params: DeepPartial<Events>, manager?: EntityManager): Promise<Events> {
    const event = await this.findOneSafe(params, manager);
    if (!event) {
      throw new EventNotFoundError(params.id);
    }
    return event;
  }
}
