import { createRouter } from "next-connect";
import { onError } from "@/lib/middleware";
import Recipe from "../../../../models/Recipe";

const router = createRouter();
router.get(async (req, res) => {
  try {
    const recipeId = req.query.id;
    const recipe = await Recipe.query().findById(recipeId);
    const tags = await Recipe.relatedQuery("tags").for(recipe.id);
    res.status(200).json(tags);
  } catch {
    res.status(400).end(`Failed to fetch recipe`);
  }
});
export default router.handler({ onError });
