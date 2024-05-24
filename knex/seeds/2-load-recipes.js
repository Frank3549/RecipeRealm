/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/recipeSeed.json");
  const data = JSON.parse(contents);

  return knex("recipes")
    .del()
    .then(() => knex("recipes").insert(data));
  // .then(() => knex.batchInsert("Recipe", data, 1000));
};
