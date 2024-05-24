/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
exports.up = function (knex) {
  // this is the join table that will be used to hold the relationship between recipes and users (many-to-many relationship)
  // this is not the author of the recipe, but rather the users that have saved the recipe to their list
  return knex.schema.createTable("user_recipes", (table) => {
    table
      .integer("recipe_id")
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.primary(["recipe_id", "user_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_recipes");
};
