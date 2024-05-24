import PropTypes from "prop-types";

// const ingredientShape = PropTypes.shape({
//   unit: PropTypes.string.isRequired,
//   ingredient: PropTypes.string.isRequired,
//   quantity: PropTypes.number.isRequired,
// });
const ingredientShape = PropTypes.shape({
  unit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  indexInRecipe: PropTypes.number.isRequired,
});

export default ingredientShape;
