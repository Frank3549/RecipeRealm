import React from "react";
import { SessionProvider } from "next-auth/react";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import Creator from "@/pages/create";

// Replace the instances of router with its mocked version.
// eslint-disable-next-line global-require
jest.mock("next/router", () => require("next-router-mock"));

// Tell the mock router about the pages we will use (so we can use dynamic routes)
mockRouter.useParser(createDynamicRouteParser(["/create"]));

describe("Create Recipe Page", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/create");
    render(
      // Must mock session provider to avoid test errors due to invalid session.
      <SessionProvider session={{ user: { id: "mockUserID" } }}>
        <Creator pushCurrentRecipe={jest.fn()} />
      </SessionProvider>,
    );
  });

  describe("Form Inputs", () => {
    test("Title input element is present", () => {
      const element = screen.getByPlaceholderText("Recipe Title");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("type", "text");
    });

    test("Servings input element is present", () => {
      const element = screen.getByPlaceholderText("Servings");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("type", "number");
      expect(element).toHaveAttribute("placeholder", "Servings");
    });

    test("Preparation Steps text area is visible", () => {
      const element = screen.getByPlaceholderText("Preparation Steps");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("TEXTAREA");
    });
  });

  describe("Buttons", () => {
    test("Delete Ingredient button is present", () => {
      const element = screen.getByText("Delete Ingredient");
      expect(element).toBeInTheDocument();
    });

    test("Add Ingredient button is present", () => {
      const element = screen.getByText("Add Ingredient");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Checkboxes and Dropdowns", () => {
    test("Public checkbox is present", () => {
      const element = screen.getByTestId("publicCheckbox");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("type", "checkbox");
    });

    test("Dropdown for unit measurements is present", () => {
      const element = screen.getByTestId("unitType");
      expect(element).toBeInTheDocument();
    });

    test("All options for dietary restrictions are present", () => {
      const element1 = screen.getByText("Food Allergies");
      const element2 = screen.getByText("Dietary Restrictions");
      const element3 = screen.getByText("Time");
      const element4 = screen.getByText("Difficulty");

      expect(element1).toBeInTheDocument();
      expect(element2).toBeInTheDocument();
      expect(element3).toBeInTheDocument();
      expect(element4).toBeInTheDocument();
    });
  });

  describe("Buttons", () => {
    test("Save Button is present", () => {
      const element = screen.getByText("Save");
      expect(element).toBeInTheDocument();
    });

    test.skip("Cancel Button is present", () => {
      // Cancel Button removed from the page
      const element = screen.getByText("Cancel");
      expect(element).toBeInTheDocument();
    });
  });
});
