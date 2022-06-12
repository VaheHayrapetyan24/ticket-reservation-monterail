import { Authorized, Body, JsonController, Post, Req } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ReservationsService } from './reservations.service';
import { Request } from 'express';
import { Users } from '../users/users.entity';
import { CreateReservationDto } from './dto/createReservation.dto';

@Service()
@JsonController('/reservations')
export class ReservationsController {
  @Inject()
  private reservationsService: ReservationsService;

  @Post()
  @Authorized()
  public async create(@Body({ validate: true }) body: CreateReservationDto, @Req() req: Request): Promise<boolean> {
    await this.reservationsService.create(body);
    return true;
  }
}
