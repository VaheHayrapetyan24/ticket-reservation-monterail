import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}
