import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Events } from '../events/events.entity';
import { Reservations } from '../reservations/reservations.entity';

export class Tickets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aisle: number;

  @Column()
  row: number;

  @Column()
  column: number;

  @ManyToOne(() => Events)
  @JoinColumn()
  event: Events;

  @ManyToOne(() => Reservations)
  @JoinColumn()
  reservation: Reservations;
}
