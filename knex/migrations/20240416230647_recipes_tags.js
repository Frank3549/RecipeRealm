/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

// join table for recipes and tags

exports.up = function (knex) {
  return knex.schema.createTable("recipes_tags", (table) => {
    table
      .integer("recipe_id")
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .integer("tag_id")
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");
    table.primary(["recipe_id", "tag_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("recipes_tags");
};
