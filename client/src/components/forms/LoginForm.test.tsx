import { render, screen, userEvent } from "../../utils/test-utils";
import Login from "./LoginForm";

async function populateFields({
  email = "valid.email@test.com",
  password = "12345678",
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

  it("is disabled until valid", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
  });

  it("is disabled until all valid", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button");

    // Invalid password
    await populateFields({ password: "123" });

    expect(submitButton).toBeDisabled();
  });

  it("is disabled until all valid 2", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");

    // Invalid email
    await populateFields({ email: "invalid.email" });

    expect(submitButton).toBeDisabled();
  });

  it("accepts actual email", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");

    await populateFields({ email: "invalid email" });

    expect(submitButton).toBeDisabled();
  });

  it("accepts actual password", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");

    await populateFields({ password: "1234567" });

    expect(submitButton).toBeDisabled();
  });

  it("is enabled if all valid", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button");
    await populateFields({});

    expect(submitButton).toBeEnabled();
  });
});
