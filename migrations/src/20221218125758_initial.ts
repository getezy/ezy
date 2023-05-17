import { Knex } from 'knex';
import * as uuid from 'uuid';

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
    table.string('id').primary();
    table.string('title').notNullable();
    table.enum('type', ['grpc-request']).notNullable();
    table.boolean('active').notNullable().defaultTo(false);
    table.integer('order').notNullable();
  });

  await knex.schema.createTable('grpc-request-tabs', (table) => {
    table.string('tab_id').primary();
    table.enum('protocol', ['grpc', 'grpc-web']).notNullable();
    table.string('url').nullable();
  });

  // await knex.schema.createTable('collections', (table) => {
  //   table.string('id').primary();
  //   table.string('name').notNullable();
  // });

  // await knex.schema.createTable('services', (table) => {
  //   table.string('id').primary();
  //   table.string('collection_id').notNullable();
  //   table.string('name').notNullable();
  //   table.enum('type', ['grpc']).notNullable();
  //   table.string('options').notNullable();
  // });

  // await knex.schema.createTable('grpc_methods', (table) => {
  //   table.string('id').primary();
  //   table.string('service_id').notNullable();
  //   table.string('name').notNullable();
  //   table
  //     .enum('type', ['unary', 'server-streaming', 'client-streaming', 'bidirectional-streaming'])
  //     .notNullable();
  // });

  await knex.schema.createTable('environments', (table) => {
    table.string('id').primary();
    table.string('label').notNullable();
    table.string('url').notNullable();
    table.string('color').notNullable();
  });

  await knex.schema.createTable('tls_presets', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.boolean('system').notNullable().defaultTo(false);
    table.string('tls').notNullable();
    table.string('channel_options').nullable();
  });

  await knex('tls_presets').insert([
    { id: uuid.v4(), name: 'Insecure', system: true, tls: JSON.stringify({ type: 'insecure' }) },
    {
      id: uuid.v4(),
      name: 'Server-side',
      system: true,
      tls: JSON.stringify({ type: 'server-side' }),
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings');
  await knex.schema.dropTableIfExists('tabs');
  await knex.schema.dropTableIfExists('grpc-request-tabs');
  await knex.schema.dropTableIfExists('environments');
  await knex.schema.dropTableIfExists('tls_presets');
}
