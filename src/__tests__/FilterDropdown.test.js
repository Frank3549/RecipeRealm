import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FilterDropdown from "../components/FilterDropdown";

describe("FilterDropdown Correct text output", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const onSelectMock = jest.fn();

  test("renders with correct title", () => {
    const { getByText } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={["Option 1", "Option 2"]}
        onSelect={onSelectMock}
      />,
    );

    expect(getByText("Test Dropdown")).toBeInTheDocument();
  });

  test("No options are displayed when closed", () => {
    const { queryByText } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={options}
        onSelect={onSelectMock}
      />,
    );
    options.forEach((optionValue) => {
      expect(queryByText(optionValue)).not.toBeInTheDocument();
    });
  });

  test("renders dropdown title and options", () => {
    const { getByText, getByRole } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={options}
        onSelect={onSelectMock}
      />,
    );

    const titleElement = getByText("Test Dropdown");
    expect(titleElement).toBeInTheDocument();

    fireEvent.click(titleElement); // Click to open the dropdown
    const dropdownOptions = getByRole("menu");
    expect(dropdownOptions).toBeInTheDocument();

    options.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });

  test("selects and deselects options correctly", () => {
    const { getByText } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={options}
        onSelect={onSelectMock}
      />,
    );

    fireEvent.click(getByText("Test Dropdown")); // Open the dropdown

    fireEvent.click(getByText("Option 1")); // Select Option 1
    expect(onSelectMock).toHaveBeenCalledWith(["Option 1"]);

    fireEvent.click(getByText("Option 2")); // Select Option 2
    expect(onSelectMock).toHaveBeenCalledWith(["Option 1", "Option 2"]);

    fireEvent.click(getByText("Option 1")); // Deselect Option 1
    expect(onSelectMock).toHaveBeenCalledWith(["Option 2"]);

    fireEvent.click(getByText("Option 3")); // Select Option 3
    expect(onSelectMock).toHaveBeenCalledWith(["Option 2", "Option 3"]);
  });
});
