import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Events } from '../events/events.entity';
import { Reservations } from '../reservations/reservations.entity';

@Entity('tickets')
export class Tickets {
  @PrimaryGeneratedColumn()
  id: number;

  // aisle is not included in the position string because all the reservations are done in the same aisle
  @Column()
  aisle: number;

  // row_seat position of the ticket
  // helps us do "position IN (...)" queries
  // instead of doing multiple "row = .. AND seat = .. OR row = .. AND seat = .."
  @Column()
  position: string;

  @ManyToOne(() => Events)
  @JoinColumn()
  event: Events;

  @ManyToOne(() => Reservations)
  @JoinColumn()
  reservation: Reservations;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
