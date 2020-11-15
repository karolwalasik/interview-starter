import React from "react";
import { render, getByRole, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";

const dummyProps = {
  id: "dummyId",
  name: "dummyName",
  handler: () => {},
  labelText: "dummyLabel",
};

describe("Checkbox component", () => {
  it("renders checkbox element with label", () => {
    const { getByRole, getByLabelText } = render(<Checkbox {...dummyProps} />);
    expect(getByRole("checkbox-input")).toBeInTheDocument();
    expect(getByLabelText(dummyProps.labelText)).toBeInTheDocument();
  });
});
