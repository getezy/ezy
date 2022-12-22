import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('settings', (table) => {
    table.string('key').primary();
    table.string('value').nullable();
  });

  await knex('settings').insert([
    { key: 'theme', value: JSON.stringify({ theme: 'dark' }) },
    { key: 'language', value: JSON.stringify({ language: 'en' }) },
    { key: 'alignment', value: JSON.stringify({ alignment: 'vertical' }) },
    { key: 'menu', value: JSON.stringify({ collapsed: true }) },
  ]);

  await knex.schema.createTable('tabs', (table) => {
    table.increments('id').primary();
  });

  await knex.schema.createTable('collections', (table) => {
    table.increments('id').primary();
  });

  await knex.schema.createTable('environments', (table) => {
    table.increments('id').primary();
  });

  await knex.schema.createTable('tls_presets', (table) => {
    table.increments('id').primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings');
  await knex.schema.dropTableIfExists('tabs');
  await knex.schema.dropTableIfExists('collections');
  await knex.schema.dropTableIfExists('environments');
  await knex.schema.dropTableIfExists('tls_presets');
}
