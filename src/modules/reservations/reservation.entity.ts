import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Event } from '../events/event.entity';
import { Ticket } from '../tickets/ticket.entity';
import { User } from '../users/users.entity';

export enum ReservationStatus {
  RESERVED = 'RESERVED',
  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCESSFUL = 'PAYMENT_SUCCESSFUL',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketCount: number;

  @Column()
  status: ReservationStatus;

  @Column({ type: 'timestamp' })
  reservedAt: string;

  @Column({ nullable: true })
  invoiceId: string;

  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Ticket, ticket => ticket.reservation)
  tickets: Ticket[];
}
