/* eslint-disable camelcase */
import { createRouter } from "next-connect";
import Recipe from "../../../models/Recipe";
import User from "../../../models/User";
import { onError } from "../../lib/middleware";

// This is the API route for saving a recipe to a user's account

const router = createRouter();

router
  .post(async (req, res) => {
    try {
      const { recipe_id, user_id } = req.body;
      const user = await User.query().findById(user_id);
      const recipe = await Recipe.query().findById(recipe_id);

      const savedRecipes = await user.$relatedQuery("savedRecipes");
      const isAlreadySaved = savedRecipes.some(
        (savedRecipe) => savedRecipe.id === recipe_id,
      );

      if (isAlreadySaved) {
        return res.status(400).json({ message: "Recipe is already saved" });
      }

      await user.$relatedQuery("savedRecipes").relate(recipe);
      return res.status(200).json({ message: "Recipe saved successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = req.query; // Assume user_id is passed as a query parameter
      const user = await User.query().findById(user_id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const savedRecipes = await user.$relatedQuery("savedRecipes");
      return res.status(200).json(savedRecipes); // Added return here
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Added return here
    }
  })
  .delete(async (req, res) => {
    try {
      const { recipe_id, user_id } = req.body;
      const user = await User.query().findById(user_id);
      const recipe = await Recipe.query().findById(recipe_id);
      if (!user || !recipe) {
        return res.status(404).json({ error: "User or Recipe not found" });
      }

      await user
        .$relatedQuery("savedRecipes")
        .unrelate()
        .where("id", recipe_id);
      return res.status(200).json({ message: "Recipe removed successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default router.handler({ onError });
