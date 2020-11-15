import React from "react";
import SearchInput from "./SearchInput";
import { fireEvent, render } from "@testing-library/react";

const dummyProps = {
  searchParam: "dummyParam",
  setSearchParam: () => {},
  setPageNumber: () => {},
};

describe("SearchInput component", () => {
  it("displays proper value", () => {
    const { getByPlaceholderText } = render(<SearchInput {...dummyProps} />);
    const input = getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input).toHaveValue(dummyProps.searchParam);
  });
});
