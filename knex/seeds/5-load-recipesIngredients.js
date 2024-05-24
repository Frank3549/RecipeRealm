/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/* eslint-disable func-names */
const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/recipesIngredientsSeed.json");
  const data = JSON.parse(contents);

  return knex("recipes_ingredients")
    .del()
    .then(() => knex("recipes_ingredients").insert(data));
};
