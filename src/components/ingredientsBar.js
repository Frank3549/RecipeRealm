import React from "react";
import { PropTypes } from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from "@mui/system";
import ingredientShape from "./ingredientShape";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
}));

const buttonStyle = {
  backgroundColor: "#18453B",
  color: "white",
  textTransform: "none",
  fontSize: "1em",
};

const ingredientButtonStyle = {
  backgroundColor: "#18453B",
  color: "white",
  textTransform: "none",
  fontSize: "1em",
  marginTop: "0.5em",
};

// import grid, textfield, select,

function IngredientsBar({ ingredients, setIngredients }) {
  const units = [
    // List of common units for ingredients
    "cups",
    "ml",
    "tsp",
    "tbsp",
    "grams",
    "oz (volume)",
    "oz (weight)",
    "lbs",
    "pinch",
  ];

  function deleteIngredient(indexInRecipeOfIngredient) {
    let newlyUpdatedIngredients = [...ingredients];
    newlyUpdatedIngredients = newlyUpdatedIngredients.filter(
      (element) => element.indexInRecipe !== indexInRecipeOfIngredient,
    );
    setIngredients(newlyUpdatedIngredients);
  }

  function updateIngredientName(newName, indexInRecipeOfIngredient) {
    const newlyUpdatedIngredients = ingredients.map((element) => {
      if (element.indexInRecipe === indexInRecipeOfIngredient) {
        return { ...element, name: newName };
      }
      return element;
    });
    setIngredients(newlyUpdatedIngredients);
  }

  function updateIngredientQuantity(newQuantity, indexInRecipeOfIngredient) {
    const newlyUpdatedIngredients = ingredients.map((element) => {
      if (element.indexInRecipe === indexInRecipeOfIngredient) {
        return { ...element, quantity: newQuantity };
      }
      return element;
    });
    setIngredients(newlyUpdatedIngredients);
  }

  function updateIngredientUnit(newUnit, indexInRecipeOfIngredient) {
    const newlyUpdatedIngredients = ingredients.map((element) => {
      if (element.indexInRecipe === indexInRecipeOfIngredient) {
        return { ...element, unit: newUnit };
      }
      return element;
    });
    setIngredients(newlyUpdatedIngredients);
  }

  // Function to add a new blank ingredient field
  function addIngredient() {
    const nextIndex = ingredients.reduce((maxIndex, element) => {
      if (element.indexInRecipe > maxIndex) {
        return element.indexInRecipe;
      }
      return maxIndex;
    }, 0);

    setIngredients([
      ...ingredients,
      { name: "", quantity: 0.0, unit: "cups", indexInRecipe: nextIndex + 1 },
    ]);
  }

  return (
    <FormGrid container spacing={2} justifyContent="left">
      {ingredients.map((element) => (
        <Grid container item xs={12} spacing={2} key={element.indexInRecipe}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <OutlinedInput
                type="text"
                placeholder="Ingredient"
                onChange={(event) =>
                  updateIngredientName(
                    event.target.value,
                    element.indexInRecipe,
                  )
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth>
              <OutlinedInput
                type="number"
                step="any"
                placeholder="Quantity"
                onChange={(event) =>
                  updateIngredientQuantity(
                    event.target.valueAsNumber,
                    element.indexInRecipe,
                  )
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id={`unit_select_${element.indexInRecipe}`}>
                Unit
              </InputLabel>
              <Select
                data-testid="unitType"
                native
                placeholder=""
                onChange={(event) =>
                  updateIngredientUnit(
                    event.target.value,
                    element.indexInRecipe,
                  )
                }
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <Button
              style={ingredientButtonStyle}
              onClick={() => deleteIngredient(element.indexInRecipe)}
            >
              Delete Ingredient
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button style={buttonStyle} onClick={() => addIngredient()}>
          Add Ingredient
        </Button>
      </Grid>
    </FormGrid>
  );
}
export default IngredientsBar;

IngredientsBar.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
  setIngredients: PropTypes.func.isRequired,
};

// <input type="text" placeholder="Ingredient"/>
