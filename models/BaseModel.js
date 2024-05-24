/* eslint-disable camelcase */
import { Model, AjvValidator } from "objection";
import addFormats from "ajv-formats";
import { knex } from "../knex/knex";

class BaseModel extends Model {
  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        // Make suse all ajv formats are available in validations
        addFormats(ajv);
      },
    });
  }
}

// Bind the Objection model to the Knex connection before use
Model.knex(knex);

export default BaseModel;
