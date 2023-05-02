import App from "../../App";
import { store } from "../../redux/store";
import { login, render, screen, userEvent, waitFor } from "../../utils/test-utils";
import CreateParcelForm from "./CreateParcelForm";

async function populateFields({
  pickupAddress = "123 Main St",
  dropoffAddress = "456 Side St",
}: {
  pickupAddress?: string;
  dropoffAddress?: string;
}) {
  const pickupAddressInput = screen.getByLabelText("Pickup Address");
  const dropoffAddressInput = screen.getByLabelText("Dropoff Address");

  await userEvent.type(pickupAddressInput, pickupAddress);
  await userEvent.type(dropoffAddressInput, dropoffAddress);

  return { pickupAddress, dropoffAddress };
}

describe("CreateParcelForm", () => {
  it("renders", () => {
    render(<CreateParcelForm />);

    const form = screen.getByTestId("create-parcel-form");

    expect(form).toBeInTheDocument();
  });

  describe("submission is disabled", () => {
    it("is disabled when all fields are empty", () => {
      render(<CreateParcelForm />);

      const submitButton = screen.getByRole("button");

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if pickup address is less than 3 characters long", async () => {
      render(<CreateParcelForm />);

      const submitButton = screen.getByRole("button");
      await populateFields({ pickupAddress: " s" });

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the dropoff address is less than 3 characters long", async () => {
      render(<CreateParcelForm />);

      const submitButton = screen.getByRole("button");
      await populateFields({ dropoffAddress: " s" });

      expect(submitButton).toBeDisabled();
    });
  });

  it("is enabled when all valid", async () => {
    render(<CreateParcelForm />);

    const submitButton = screen.getByRole("button");
    await populateFields({});

    expect(submitButton).toBeEnabled();
  });

  describe("submission", () => {
    it("adds a new parcel to the redux store after submission", async () => {
      render(<CreateParcelForm />);

      const submitButton = screen.getByRole("button");
      const { pickupAddress, dropoffAddress } = await populateFields({});

      await userEvent.click(submitButton);

      const state = store.getState();

      expect(state.parcels.parcels.length).toBe(1);
      expect(state.parcels.parcels[0].pickupAddress).toBe(pickupAddress);
      expect(state.parcels.parcels[0].dropoffAddress).toBe(dropoffAddress);
    });
  });

  describe("creation (integration tests)", () => {
    it("redirects to the parcels page after creation (which contains parcels table)", async () => {
      login()
      render(<App />, { initialEntries: ["/parcels/create"] })

      await waitFor(() => expect(screen.getByTestId("create-parcel-form")).toBeInTheDocument())

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await populateFields({})

      await userEvent.click(submitButton)

      expect(await screen.findByTestId("dashboard-table")).toBeInTheDocument()
    })
  })
});
