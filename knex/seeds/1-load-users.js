/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/* eslint-disable func-names */

const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/userSeed.json");
  const data = JSON.parse(contents);

  return knex("users")
    .del()
    .then(() => knex("users").insert(data));
  // .then(() => knex.insert("User", data, 1000));
};
