import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar component", () => {
  test("renders properly", () => {
    const searchKeywords = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar searchKeywords={searchKeywords} />,
    );
    const inputElement = getByPlaceholderText("Search for Recipe");
    expect(inputElement).toBeInTheDocument();
  });

  test("handles search input correctly", () => {
    const searchKeywords = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <SearchBar searchKeywords={searchKeywords} />,
    );
    const inputElement = getByPlaceholderText("Search for Recipe");
    fireEvent.change(inputElement, { target: { value: "Test Search" } });
    fireEvent.click(getByRole("button")); // Click the search button
    expect(searchKeywords).toHaveBeenCalledWith("Test Search");
  });
});
