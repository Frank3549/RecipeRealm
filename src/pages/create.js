import { useRouter } from "next/router";
// import PropTypes from "prop-types";
import RecipeCreator from "../components/RecipeCreator";

export default function Creator() {
  const router = useRouter();

  const completeFunction = async (recipe) => {
    if (recipe) {
      const response = await fetch(`/api/recipes`, {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        router.push("/GlobalRecipe");
      }
    } else {
      router.back();
    }
  };

  return (
    <RecipeCreator completeFunction={(recipe) => completeFunction(recipe)} />
  );
}
