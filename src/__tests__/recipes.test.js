import React from "react";
import { render, screen } from "@testing-library/react";
import GlobalRecipe from "../pages/recipes";

describe.skip("Search Bar and FilterComponents are rendered", () => {
  test("Search bar is rendered", () => {
    render(<GlobalRecipe />);

    // find input element of type text by Placeholder Text
    const searchBarElement = screen.getByPlaceholderText("Search for Recipe");

    expect(searchBarElement).toBeInTheDocument();
    expect(searchBarElement).toHaveAttribute("type", "text");
  });

  test("renders all FilterDropdown components", () => {
    render(<GlobalRecipe />);

    // Check if all four FilterDropdown components are present
    const foodAllergiesDropdown = screen.getByText("Food Allergies");
    const dietaryRestrictionsDropdown = screen.getByText(
      "Dietary Restrictions",
    );


    expect(foodAllergiesDropdown).toBeInTheDocument();
    expect(dietaryRestrictionsDropdown).toBeInTheDocument();
  });
});
