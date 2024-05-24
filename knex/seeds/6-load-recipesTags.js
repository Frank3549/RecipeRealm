/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/* eslint-disable func-names */
const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/recipesTagsSeed.json");
  const data = JSON.parse(contents);

  return knex("recipes_tags")
    .del()
    .then(() => knex("recipes_tags").insert(data));
};
