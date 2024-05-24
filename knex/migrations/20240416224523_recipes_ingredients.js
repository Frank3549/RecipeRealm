/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

// This defines the migration for the recipes_ingredients join table

exports.up = function (knex) {
  return knex.schema.createTable("recipes_ingredients", (table) => {
    table
      .integer("recipe_id")
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .integer("ingredient_id")
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE");
    table.float("quantity");
    table.string("units");
    table.primary(["recipe_id", "ingredient_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("recipes_ingredients");
};
