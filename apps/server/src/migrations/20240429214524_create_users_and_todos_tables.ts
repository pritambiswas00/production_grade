import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTableIfNotExists('users', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTableIfNotExists('todos', function (table) {
      table.increments();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.boolean('completed').notNullable().defaultTo(false);
      table.integer('user_id').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos').dropTable('users');
}
