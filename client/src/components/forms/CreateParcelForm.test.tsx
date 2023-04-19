import CreateParcelForm from "./CreateParcelForm";
import { render, screen, userEvent } from "../../utils/test-utils";

describe("CreateParcelForm", () => {
  it("renders", () => {
    render(<CreateParcelForm />);

    const form = screen.getByTestId("create-parcel-form");

    expect(form).toBeInTheDocument();
  });

  it("is disabled until valid", () => {
    render(<CreateParcelForm />);

    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();
  });

  it("is disabled until all valid", async () => {
    render(<CreateParcelForm />);

    const submitButton = screen.getByRole("button");
    const pickupAddressInput = screen.getByLabelText("Pickup Address");
    await userEvent.type(pickupAddressInput, "123 Main St");

    expect(submitButton).toBeDisabled();
  });

  it("is disabled until all valid2", async () => {
    render(<CreateParcelForm />);

    const submitButton = screen.getByRole("button");
    const dropoffAddressInput = screen.getByLabelText("Dropoff Address");
    await userEvent.type(dropoffAddressInput, "123 Main St");

    expect(submitButton).toBeDisabled();
  });

  it("is enabled when all valid", async () => {
    render(<CreateParcelForm />);

    const submitButton = screen.getByRole("button");
    const pickupAddressInput = screen.getByLabelText("Pickup Address");
    const dropoffAddressInput = screen.getByLabelText("Dropoff Address");
    await userEvent.type(pickupAddressInput, "123 Main St");
    await userEvent.type(dropoffAddressInput, "123 Main St");

    expect(submitButton).toBeEnabled();
  });
});
