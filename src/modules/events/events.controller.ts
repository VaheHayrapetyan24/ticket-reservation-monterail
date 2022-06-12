import {
  Authorized,
  Body,
  JsonController,
  Post,
  Req,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { EventsService } from "./events.service";
import { Request } from 'express';
import { User } from '../users/users.entity';

@Service()
@JsonController('/events')
export class EventsController {
  @Inject()
  private eventsService: EventsService;

}
