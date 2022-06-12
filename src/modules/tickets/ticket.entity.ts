import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../events/event.entity";
import { Reservation } from "../reservations/reservation.entity";

export class Ticket {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  section: number;

  @Column()
  row: number;

  @Column()
  column: number;

  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event;

  @ManyToOne(() => Reservation)
  @JoinColumn()
  reservation: Reservation;
}