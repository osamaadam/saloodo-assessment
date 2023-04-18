// @vitest-environment jsdom
import CreateParcelForm from "../components/forms/CreateParcelForm";
import { render, screen } from "../utils/test-utils";

// TODO: Fix editor diagnostics
test("CreateParcelForm renders", () => {
  render(<CreateParcelForm />);

  const form = screen.getByTestId("create-parcel-form");

  expect(form).toBeInTheDocument();
});
