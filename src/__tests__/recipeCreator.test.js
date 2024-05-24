/* 
Tests for the recipe creation ui.
*/
import { useRouter } from "next/router";
import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "../components/HomePage";
import RecipeCreator from "../components/RecipeCreator";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
pushMock.mockReturnValue("/create");

describe.skip("Recipe Creation UI tests", () => {
  test("If the getting started button is clicked, Recipe Creator is rendered", async () => {
    useRouter.mockReturnValue({
      push: pushMock,
    });

    // const { findByTestId, getByText } = render(<HomePage />);
    render(<HomePage />);

    // Check if RecipeCreator component is not rendered
    const recipeCreator1 = screen.queryByTestId("RecipeCreatorTestId");
    expect(recipeCreator1).toBeNull();

    // Click the get started button
    const button = screen.queryByTestId("getStartedButton");
    expect(button).toBeInTheDocument();

    await fireEvent.click(button);
    expect(useRouter).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith("/create");

    // const { RecipeCreator } = await import('../components/RecipeCreator');
    render(<RecipeCreator completeFunction={jest.fn()} />);

    const recipeCreator2 = screen.getByTestId("RecipeCreatorTestId");
    expect(recipeCreator2).toBeInTheDocument();

    // expect(screen.queryByTestId("getStartedButton")).toBeNull();

    // Check if RecipeCreator component is rendered
    // expect(recipeCreator2).toBeInTheDocument();
    // const recipeCreator2 = screen.queryByTestId("RecipeCreatorTestId");
    // expect(recipeCreator2).not.toBeNull();
  });
});
