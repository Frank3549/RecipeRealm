/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Ingredient from "./Ingredient"; // eslint-disable-line import/no-cycle
import Tags from "./Tags"; // eslint-disable-line import/no-cycle
import User from "./User"; // eslint-disable-line import/no-cycle

export default class Recipe extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "recipes";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        prepSteps: { type: "string", default: "" },
        // servings: { type: "string" },
        servings: { type: "integer", default: 1 },
        isPublic: { type: "boolean", default: false },
        author: { type: "integer" },
        edited: { type: "string", format: "date-time" },
        time: { type: "string", default: "60 minutes" },
        difficulty: { type: "string", default: "Easy" },
      },
    };
  }

  static relationMappings = () => ({
    ingredients: {
      // schema for join table between recipes and ingredients
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient,
      join: {
        from: "recipes.id",
        through: {
          from: "recipes_ingredients.recipe_id",
          to: "recipes_ingredients.ingredient_id",
          extra: ["quantity", "units"],
        },
        to: "ingredients.id",
      },
    },
    tags: {
      // schema for join table between tags and recipes
      relation: Model.ManyToManyRelation,
      modelClass: Tags,
      join: {
        from: "recipes.id",
        through: {
          from: "recipes_tags.recipe_id",
          to: "recipes_tags.tag_id",
        },
        to: "tags.id",
      },
    },
    saved: {
      // schema for join table between users and recipes
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "recipes.id",
        through: {
          from: "user_recipes.recipe_id",
          to: "user_recipes.user_id",
        },
        to: "users.id",
      },
    },
    writtenBy: {
      // schema for author of recipe relationship. One to many. User Id of author is stored in the recipe table as a foreign key
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "recipes.author",
        to: "users.id",
      },
    },
  });
}
