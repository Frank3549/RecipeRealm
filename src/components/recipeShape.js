/*
  recipeShape.js

  This provides a PropTypes shape descriptor of recipe objects. This is pulled out
  since multiple components take articles as props.
*/

import PropTypes from "prop-types";
import ingredientShape from "./ingredientShape";

const recipeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  servings: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
  prepSteps: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  edited: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.string,
  difficulty: PropTypes.string,
});

export default recipeShape;
