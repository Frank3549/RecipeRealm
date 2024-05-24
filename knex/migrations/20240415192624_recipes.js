/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

// This is the parent table for recipes

exports.up = function (knex) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("id").primary();
    table.string("title").unique().notNullable();
    // table.string("servings").notNullable(); // TODO CHANGE TO INTEGER
    table.integer("servings").notNullable();
    table.text("prepSteps").notNullable();
    table.boolean("isPublic").notNullable();
    table
      .integer("author")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("edited").defaultTo(knex.fn.now());
    table.string("time").notNullable();
    table.string("difficulty").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipes");
};
