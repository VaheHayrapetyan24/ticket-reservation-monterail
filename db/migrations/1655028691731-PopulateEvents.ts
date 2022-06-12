import { MigrationInterface, QueryRunner } from 'typeorm';
import events from '../defaultData/events.json';

export class PopulateEvents1655028691731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const event of events) {
      await queryRunner.manager.createQueryBuilder().insert().into('events').values(event).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from('events');
  }
}
