import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";

/* eslint-disable no-console  */

const buttonStyle = {
  backgroundColor: "#18453B",
  color: "white",
  textTransform: "none",
  fontSize: "1em",
  padding: "10px 20px",
  margin: "10px 0",
  borderRadius: "5px",
};

export default function RecipePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState();

  // extract recipeid from the URL
  const { id: recipeid } = router.query;

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [fetchedIngredients, setFetchedIngredients] = useState([]);
  const [fetchedTags, setFetchedTags] = useState([]);

  useEffect(() => {
    // Fetch the recipes ingredients from the database
    const selectedRecipeIngredients = async () => {
      try {
        const response = await fetch(`/api/recipes_ingredients/${+recipeid}`);
        if (response.ok) {
          const data = await response.json();
          setFetchedIngredients(data);
        } else {
          console.error("Failed to fetch ingredients");
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    selectedRecipeIngredients();
  }, [recipeid]);

  useEffect(() => {
    // Fetch the recipes tags from the database
    const selectedRecipeTags = async () => {
      try {
        const response = await fetch(`/api/recipes_tags/${+recipeid}`);
        if (response.ok) {
          const data = await response.json();
          setFetchedTags(data);
        } else {
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    selectedRecipeTags();
  }, [recipeid]);

  const getRecipe = async () => {
    // Fetch the recipe from the database and fill in it's fields
    const response = await fetch(`/api/recipes/${+recipeid}`);
    const recipe = await response.json();

    setSelectedRecipe({
      title: recipe.title,
      servings: recipe.servings,
      prepSteps: recipe.prepSteps,
      author: recipe.author,
      isPublic: recipe.isPublic,
      id: +recipeid,
      edited: recipe.edited,
      difficulty: recipe.difficulty,
      time: recipe.time,
      ingredients: fetchedIngredients,
      tags: fetchedTags,
    });
  };

  useEffect(() => {
    getRecipe();
  });

  // Write a callback to the save button that will save the recipe to the user's account (using the user_recipes table in the database)

  const capitalizeFirstLetter = (string) => {
    // Check if string is defined and not null
    if (typeof string !== "string" || string.length === 0) {
      return ""; // or any other fallback behavior you prefer
    }
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // Write a callback to the save button that will save the recipe to the user's account (using the user_recipes table in the database)
  const saveRecipe = async () => {
    if (session) {
      // Save the recipe to the user's account
      const response = await fetch("/api/user_recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: +recipeid,
          user_id: session.user.id,
        }),
      });
      if (response.ok) {
        setIsSaved(true);
      } else if (response.status === 400) {
        // eslint-disable-next-line no-alert
        alert("Recipe is already saved");
      } else {
        setIsSaved(false);
      }
    } else {
      // If the user is not signed in, prompt them to sign in
      // eslint-disable-next-line no-alert
      alert("Please sign in to save the recipe.");
      // Redirect the user to the sign in page
      await signIn("google", { callbackUrl: "/GlobalRecipe" });
    }
  };

  const unSaveRecipe = async () => {
    if (session) {
      // Save the recipe to the user's account
      const response = await fetch("/api/user_recipes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: +recipeid,
          user_id: session.user.id,
        }),
      });
      if (response.ok) {
        setIsSaved(false);
      } else {
        setIsSaved(false);
      }
    } else {
      // If the user is not signed in, prompt them to sign in
      // eslint-disable-next-line no-alert
      alert("Please sign in to remove the recipe.");
      // Redirect the user to the sign in page
      await signIn("google", { callbackUrl: "/GlobalRecipe" });
    }
  };

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!session) return;
      const response = await fetch(
        `/api/user_recipes?user_id=${session.user.id}`,
      );
      const data = await response.json();
      const recipeIsSaved = data.some((recipe) => recipe.id === +recipeid);
      setIsSaved(recipeIsSaved);
    };
    checkIfSaved();
  }, [session, selectedRecipe, recipeid]);

  return (
    <Container>
      <Button onClick={() => router.back()} style={buttonStyle}>
        View Other Recipes
      </Button>
      {selectedRecipe && (
        <RecipeDetailsCard>
          <RecipeTitle>
            {capitalizeFirstLetter(selectedRecipe.title)}
          </RecipeTitle>
          <RecipeInfo>
            <InfoLabel>Servings:</InfoLabel> {selectedRecipe.servings}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Ingredients:</InfoLabel>{" "}
            <IngredientsList>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <IngredientItem key={ingredient.id}>
                  {ingredient.quantity} {ingredient.units} of {ingredient.name}
                  {index !== selectedRecipe.ingredients.length - 1 && ","}
                </IngredientItem>
              ))}
            </IngredientsList>
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Preparation Steps:</InfoLabel> {selectedRecipe.prepSteps}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Dietary Restrictions: </InfoLabel>
            {selectedRecipe.tags.map((tag, index) => (
              <span key={tag.id}>
                {tag.name}
                {index !== selectedRecipe.tags.length - 1 && ", "}
              </span>
            ))}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Time:</InfoLabel> {selectedRecipe.time} minutes
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Difficulty:</InfoLabel> {selectedRecipe.difficulty}
          </RecipeInfo>
          {isSaved ? (
            <Button onClick={unSaveRecipe} style={buttonStyle}>
              Unsave Recipe
            </Button>
          ) : (
            <Button onClick={saveRecipe} style={buttonStyle}>
              Save Recipe
            </Button>
          )}
        </RecipeDetailsCard>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeDetailsCard = styled.div`
  margin-top: 20px;
  margin-bottom: 110px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 600px;
  width: 100%;
`;

const RecipeTitle = styled.h3`
  text-align: center;
  font-size: 2.5em;
  color: #18453b;
  margin-bottom: 20px;
`;

const RecipeInfo = styled.p`
  margin: 10px 0;
  font-size: 1em;
  line-height: 1.5;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #18453b;
  min-width: 100px; /* Adjust as needed */
`;

const IngredientsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex: 1; /* Allow the list to take remaining space */
`;

const IngredientItem = styled.p`
  margin-right: 10px;
`;
