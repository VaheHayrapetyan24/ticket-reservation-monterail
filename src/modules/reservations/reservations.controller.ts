import { Authorized, Body, Get, JsonController, Param, Post, Req } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ReservationsService } from './reservations.service';
import { Request } from 'express';
import { Users } from '../users/users.entity';
import { CreateReservationDto } from './dto/createReservation.dto';
import { Reservations } from './reservations.entity';

@Service()
@JsonController('/reservations')
export class ReservationsController {
  @Inject()
  private reservationsService: ReservationsService;

  @Post()
  @Authorized()
  public async create(@Body({ validate: true }) body: CreateReservationDto, @Req() req: Request): Promise<boolean> {
    await this.reservationsService.create(body, req.user as Users);
    return true;
  }

  @Get()
  @Authorized()
  public async get(@Req() req: Request): Promise<Reservations[]> {
    return this.reservationsService.getReservationsOfUser(req.user as Users);
  }

  @Get('/:id')
  @Authorized()
  public async getById(@Param('id') id: string, @Req() req: Request): Promise<Reservations> {
    return this.reservationsService.getReservationById(parseInt(id), req.user as Users);
  }
}
