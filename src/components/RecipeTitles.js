import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Container = styled("div")(({ theme: styledTheme }) => ({
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(10), // This adds space at the top
  paddingBottom: styledTheme.spacing(10), // Add padding at the bottom to increase height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

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
function RecipeTitles({ recipes, setSelectedRecipe }) {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-evenly",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              position: "relative", // Ensure the card is a positioned container
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              width: "300px",
              height: "400px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#E8F5E9", // Light green background
              overflow: "hidden", // Hide any overflow from the icon
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "100px",
                color: "rgba(24, 69, 59, 0.1)", // Semi-transparent dark green
                zIndex: 0, // Ensure it is behind the content
                pointerEvents: "none", // Make sure the icon doesn't interfere with interactions
              }}
            >
              <FastfoodIcon fontSize="inherit" />
            </div>
            <h3
              style={{
                margin: "0",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#18453B", // Dark green title color
                zIndex: 1, // Ensure title is above the icon
              }}
            >
              {capitalizeFirstLetter(recipe.title)}
            </h3>
            <Button
              style={{ background: "#18453B", marginTop: "auto", zIndex: 1 }}
            >
              <span
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setSelectedRecipe(recipe);
                }}
              >
                View More
              </span>
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
}

RecipeTitles.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  setSelectedRecipe: PropTypes.func,
};

export default RecipeTitles;
