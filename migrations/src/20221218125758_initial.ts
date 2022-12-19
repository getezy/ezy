import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('settings', (table) => {
    table.string('key').primary();
    table.string('value').nullable();
  });

  await knex('settings').insert([
    { key: 'theme', value: 'dark' },
    { key: 'language', value: 'en' },
    { key: 'alignment', value: 'vertical' },
    { key: 'is_menu_collapsed', value: 'true' },
  ]);

  await knex.schema.createTable('tabs', (table) => {
    table.string('id').primary();
  });

  await knex.schema.createTable('collections', (table) => {
    table.string('id').primary();
  });

  await knex.schema.createTable('environments', (table) => {
    table.string('id').primary();
  });

  await knex.schema.createTable('tls_presets', (table) => {
    table.string('id').primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings');
  await knex.schema.dropTableIfExists('tabs');
  await knex.schema.dropTableIfExists('collections');
  await knex.schema.dropTableIfExists('environments');
  await knex.schema.dropTableIfExists('tls_presets');
}
