/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Recipe from "./Recipe"; // eslint-disable-line import/no-cycle

export default class Tags extends BaseModel {
  static get tableName() {
    return "tags";
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
      // schema for join table between tags and recipes (many-to-many relationship)
      relation: Model.ManyToManyRelation,
      modelClass: Recipe,
      join: {
        from: "tags.id",
        through: {
          from: "recipes_tags.tag_id",
          to: "recipes_tags.recipe_id",
        },
        to: "recipes.id",
      },
    },
  });
}
