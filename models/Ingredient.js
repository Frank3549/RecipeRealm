/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Recipe from "./Recipe"; // eslint-disable-line import/no-cycle

export default class Ingredient extends BaseModel {
  static get tableName() {
    return "ingredients";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
    };
  }

  static relationMappings = () => ({
    recipes: {
      // schema for join table between recipes and ingredients
      relation: Model.ManyToManyRelation,
      modelClass: Recipe, // eslint-disable-line no-use-before-define
      join: {
        from: "ingredients.id",
        through: {
          from: "recipes_ingredients.ingredient_id",
          to: "recipes_ingredients.recipe_id",
          extra: ["quantity", "units"],
        },
        to: "recipes.id",
      },
    },
  });
}
