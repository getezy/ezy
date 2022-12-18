import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('settings', (table) => {
    table.increments('id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('settings');
}
