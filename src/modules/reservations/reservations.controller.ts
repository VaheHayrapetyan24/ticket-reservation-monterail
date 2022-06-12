import {
  Authorized,
  Body,
  JsonController,
  Post,
  Req,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ReservationsService } from "./reservations.service";
import { Request } from 'express';
import { User } from '../users/users.entity';

@Service()
@JsonController('/reservations')
export class ReservationsController {
  @Inject()
  private reservationsService: ReservationsService;

}
