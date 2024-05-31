import { createRouter } from "next-connect";
import Recipe from "../../../../../models/Recipe";
import { onError } from "../../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    const recipes = await Recipe.query()
        .where('author', req.query.id)
        .throwIfNotFound();
    res.status(200).json(recipes);
  })

export default router.handler({ onError });
