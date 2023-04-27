import { render, screen, userEvent } from "../../utils/test-utils";
import Login from "./LoginForm";

async function populateFields({
  email = "valid.email@test.com",
  password = "123",
}: {
  email?: string;
  password?: string;
}) {
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");

  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);
}

describe("LoginForm", () => {
  it("renders", () => {
    render(<Login />);
    const form = screen.getByTestId("login-form");
    expect(form).toBeInTheDocument();
  });

  describe("submission is disabled", () => {
    it("is disabled when all fields are empty", () => {
      render(<Login />);
      const submitButton = screen.getByRole("button");
      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the password is less than required length", async () => {
      render(<Login />);

      const submitButton = screen.getByRole("button");
      await populateFields({ password: "12" });

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the email is invalid", async () => {
      render(<Login />);

      const submitButton = screen.getByRole("button");
      await populateFields({ email: "invalid.email" });

      expect(submitButton).toBeDisabled();
    });
  });

  it("is enabled if all valid", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button");
    await populateFields({});

    expect(submitButton).toBeEnabled();
  });
});
