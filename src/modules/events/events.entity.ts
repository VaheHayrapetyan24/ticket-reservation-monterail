import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  // id for fetching the ticket configuration for the venue
  @Column()
  venueConfigurationId: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
