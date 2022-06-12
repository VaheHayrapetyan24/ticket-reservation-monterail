import { MigrationInterface, QueryRunner } from 'typeorm';
import eventConfiguration from '../../db/defaultData/venueConfiguration.json';
import { Events } from '../../src/modules/events/events.entity';

export class PopulateTickets1655028818220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const event = await queryRunner.manager.findOne(Events);
    for (let aisle = 0; aisle < eventConfiguration.aisles.length; aisle++) {
      for (let row = 1; row <= eventConfiguration.aisles[aisle].rowCount; row++) {
        for (let seat = 1; seat <= eventConfiguration.aisles[aisle].seatCount; seat++) {
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('tickets')
            .values({
              aisle: aisle + 1,
              position: `${row}_${seat}`,
              event,
            })
            .execute();
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from('tickets');
  }
}
