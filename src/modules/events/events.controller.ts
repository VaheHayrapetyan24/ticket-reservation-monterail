import { Authorized, Get, JsonController } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { EventsService } from './events.service';

@Service()
@JsonController('/events')
export class EventsController {
  @Inject()
  private eventsService: EventsService;

  @Get()
  @Authorized()
  async getAll() {
    return this.eventsService.getAll();
  }
}
