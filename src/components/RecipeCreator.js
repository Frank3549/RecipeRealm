import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import styles from "../styles/Editor.module.css";
import FilterOptions from "./FilterOptions";
import IngredientsBar from "./ingredientsBar";

export default function RecipeCreator({ completeFunction }) {
  const { data: session } = useSession();

  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    servings: 1,
    prepSteps: "",
    isPublic: false,
    author: session?.user?.id, // Optional Chaining operator used to handle undefined.
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
  ]);

  /* eslint-disable no-unused-vars */
  const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
  const [dietaryRestrictionsSelected, setDietaryRestrictionsSelected] =
    useState([]);
  const [timeSelected, setTimeSelected] = useState([]);
  const [difficultySelected, setDifficultySelected] = useState([]);
  /* eslint-disable no-unused-vars */

  const { title, servings, prepSteps, author, isPublic } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const newRecipe = {
      title,
      servings: +servings,
      prepSteps,
      isPublic,
      author,
      ingredients,
      edited: currentDate,
      // combine the foodAllergiesSelected and dietaryRestrictionsSelected into tags
      tags: [...foodAllergiesSelected, ...dietaryRestrictionsSelected],
    };
    await completeFunction(newRecipe);
    router.push("/GlobalRecipe");

    // Reset the form data after submission
    setFormData({
      title: "",
      servings: 1,
      prepSteps: "",
      isPublic: false,
      author: session.user.id,
      ingredients: [
        { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
      ],
    });
    setFoodAllergiesSelected([]);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} className={styles.editor}>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={title}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            step="1"
            name="servings"
            placeholder="Servings"
            value={servings}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <IngredientsBar
            ingredients={ingredients}
            name="ingredients"
            setIngredients={setIngredients}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={5}
            type="text"
            name="prepSteps"
            placeholder="Preparation Steps"
            variant="outlined"
            value={prepSteps}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>
            Public:
            <input
              type="checkbox"
              checked={isPublic}
              name="isPublic"
              data-testid="publicCheckbox"
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  isPublic: !isPublic,
                }))
              }
            />
          </InputLabel>
        </Grid>
        <Grid item xs={12}>
          <FilterOptions
            setFoodAllergiesSelected={setFoodAllergiesSelected}
            setDietaryRestrictionsSelected={setDietaryRestrictionsSelected}
            setTimeSelected={setTimeSelected}
            setDifficultySelected={setDifficultySelected}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            style={{
              backgroundColor: "#18453B",
              color: "white",
              textTransform: "none",
              fontSize: "1em",
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

RecipeCreator.propTypes = {
  completeFunction: PropTypes.func.isRequired,
};
