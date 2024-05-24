import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import RecipeTitles from "@/components/RecipeTitles";
import SearchBar from "@/components/SearchBar";

function GlobalRecipe({ selectedRecipe, setSelectedRecipe }) {
  const [originalRecipes, setOriginalRecipes] = useState([]); // changed from useState([{}])
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`/api/recipes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        setRecipes(response);
        setOriginalRecipes(response);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Error fetching all recipes ${error}`));
  }, []);

  const searchKeywords = (searchText) => {
    if (searchText === "") {
      setRecipes(originalRecipes);
    } else {
      const filteredRecipes = originalRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <SearchBar searchKeywords={searchKeywords} />
      <RecipeTitles
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
    </div>
  );
}

GlobalRecipe.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedRecipe: PropTypes.object,
  setSelectedRecipe: PropTypes.func,
};

export default GlobalRecipe;
