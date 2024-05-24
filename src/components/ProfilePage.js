import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import RecipeTitles from "./RecipeTitles";

function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (session) {
        const response = await fetch(
          `/api/user_recipes?user_id=${session.user.id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setSavedRecipes(data);
        } else {
          // eslint-disable-next-line no-console
          console.error("Failed to fetch saved recipes");
        }
      }
    };
    fetchSavedRecipes();
  }, [session, router]);

  const setSelectedRecipe = (recipe) => {
    if (recipe) {
      router.push(`/recipe/${recipe.id}`);
    } else {
      router.push("/GlobalRecipe");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/Home"); // Redirect to home page after sign-out
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
          Welcome <b style={{ color: "purple" }}> {session.user.name} </b>!{" "}
          <LogoutIcon
            onClick={handleSignOut}
            style={{ cursor: "pointer", fontSize: "0.7em" }}
          />
        </div>
      )}
      <RecipeTitles
        recipes={savedRecipes}
        setSelectedRecipe={(recipe) => setSelectedRecipe(recipe)}
      />
    </Container>
  );
}

export default ProfilePage;
