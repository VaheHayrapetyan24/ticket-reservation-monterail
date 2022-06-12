import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReservations1655001711815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reservation',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ticketCount',
            type: 'smallint',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'reservedAt',
            type: 'timestamp',
          },
          {
            name: 'invoiceId',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'eventId',
            type: 'bigint',
          },
          {
            name: 'userId',
            type: 'bigint',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['eventId'],
            referencedTableName: 'events',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reservation');
  }
}
