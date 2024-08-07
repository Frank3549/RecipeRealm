import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import FilterOptions from "./CheckboxOptions";
import IngredientsBar from "./ingredientsBar";
import RadioButtonsGroup from "./RadioOptions";
import difficultyOptions from "../../data/difficulty.json";

export default function RecipeCreator({ completeFunction }) {
  const { data: session } = useSession();

  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    servings: undefined,
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
  const [difficultySelected, setDifficultySelected] = useState("");
  /* eslint-disable no-unused-vars */

  const { title, time, servings, prepSteps, author, isPublic, difficulty } =
    formData;

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
      time: +time,
      ingredients,
      edited: currentDate,
      difficulty: difficultySelected,
      // combine the foodAllergiesSelected and dietaryRestrictionsSelected into tags
      tags: [...foodAllergiesSelected, ...dietaryRestrictionsSelected],
    };
    await completeFunction(newRecipe);
    router.push("/recipes");

    // Reset the form data after submission
    setFormData({
      title: "",
      time: "",
      servings: undefined,
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
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            type="text"
            name="title"
            placeholder="Recipe Title"
            required
            value={title}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="text"
            name="time"
            placeholder="Time (minutes)"
            required
            value={time}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            step="1"
            name="servings"
            required
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
            required
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
        <Grid item xs={3}>
          <FilterOptions
            setFoodAllergiesSelected={setFoodAllergiesSelected}
            setDietaryRestrictionsSelected={setDietaryRestrictionsSelected}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioButtonsGroup
            options={difficultyOptions}
            visibleName="Difficulty"
            onOptionChange={setDifficultySelected}
            defaultOption={difficultyOptions[0]}
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
