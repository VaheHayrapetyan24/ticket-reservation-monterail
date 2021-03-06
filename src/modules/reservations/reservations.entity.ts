import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Events } from '../events/events.entity';
import { Tickets } from '../tickets/tickets.entity';
import { Users } from '../users/users.entity';

export enum ReservationStatus {
  RESERVED = 'RESERVED',
  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCESSFUL = 'PAYMENT_SUCCESSFUL',
}

@Entity('reservations')
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: ReservationStatus;

  @Column({ type: 'timestamp' })
  reservedAt: string;

  @Column({ nullable: true })
  invoiceId: string;

  @ManyToOne(() => Events)
  @JoinColumn()
  event: Events;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @OneToMany(() => Tickets, ticket => ticket.reservation)
  tickets: Tickets[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
