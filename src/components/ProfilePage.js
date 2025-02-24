/* eslint-disable no-console */
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import RecipeTitles from "./RecipeTitles";

function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [combinedRecipes, setCombinedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRecipes, setHasRecipes] = useState(false);

  const combineAuthorAndSavedRecipes = (saved, authors) => {
    const combinedRecipeArray = [...saved, ...authors];
    const uniqueID = new Set();
    const uniqueRecipeArray = combinedRecipeArray.filter((recipe) => {
      if (uniqueID.has(recipe.id)) {
        return false;
      }
      uniqueID.add(recipe.id);
      return true;
    });
    return uniqueRecipeArray;
  };

  useEffect(() => {
    const fetchAuthorAndSavedRecipes = async () => {
      if (session) {
        try {
          const response1 = await fetch(
            `/api/user_recipes?user_id=${session.user.id}`,
          );
          const response2 = await fetch(
            `/api/recipes/author/${session.user.id}`,
          );

          if (response1.ok && response2.ok) {
            const savedData = await response1.json();
            const authorData = await response2.json();
            const combined = combineAuthorAndSavedRecipes(
              savedData,
              authorData,
            );
            setCombinedRecipes(combined);
            setHasRecipes(combined.length > 0);
          } else if (response1.ok) {
            const savedData = await response1.json();
            setCombinedRecipes(savedData);
            setHasRecipes(savedData.length > 0);
            console.error("Failed to fetch authorRecipes or it is empty");
          } else if (response2.ok) {
            const authorData = await response2.json();
            setCombinedRecipes(authorData);
            setHasRecipes(authorData.length > 0);
            console.error("Failed to fetch savedRecipes or it is empty");
          } else {
            if (!response1.ok) console.error("Failed to fetch savedRecipes");
            if (!response2.ok) console.error("Failed to fetch authorRecipes");
          }
        } catch (error) {
          console.error("Error fetching recipes:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("User session is not valid");
        setIsLoading(false);
      }
    };

    fetchAuthorAndSavedRecipes();
  }, [session, router]);

  const setSelectedRecipe = (recipe) => {
    if (recipe) {
      router.push(`recipes/${recipe.id}`);
    } else {
      router.push("/recipes");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/home"); // Redirect to home page after sign-out
  };

  const Container = styled("div")(({ theme: styledTheme }) => ({
    display: "flex",
    // height set to screen height
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    marginTop: styledTheme.spacing(0),
    paddingTop: styledTheme.spacing(0),
  }));

  return (
    <Container>
      {session && (
        <div style={{ fontSize: "4em" }}>
          Welcome back
          <b style={{ color: "purple" }}>
            {" "}
            {session.user.name.split(" ")[0]}
          </b>!{" "}
          <LogoutIcon
            onClick={handleSignOut}
            style={{ cursor: "pointer", fontSize: "0.7em" }}
          />
        </div>
      )}

      {isLoading && <h2>Loading....</h2>}
      {!isLoading && hasRecipes && (
        <RecipeTitles
          recipes={combinedRecipes}
          setSelectedRecipe={(recipe) => setSelectedRecipe(recipe)}
        />
      )}
      {!isLoading && !hasRecipes && <h2>No recipes saved</h2>}
    </Container>
  );
}

export default ProfilePage;
