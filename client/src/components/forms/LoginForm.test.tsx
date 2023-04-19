import { render, screen, userEvent } from "../../utils/test-utils";
import Login from "./LoginForm";

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
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "client.1@test.com");

    expect(submitButton).toBeDisabled();
  });

  it("is disabled until all valid 2", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "password");

    expect(submitButton).toBeDisabled();
  });

  it("accepts valid input", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(emailInput, " ");
    await userEvent.type(passwordInput, " ");

    expect(submitButton).toBeDisabled();
  });

  it("accepts actual email", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(emailInput, "invalid email");
    await userEvent.type(passwordInput, "valid password");

    expect(submitButton).toBeDisabled();
  });

  it("accepts actual password", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(emailInput, "valid.email@test.com");
    await userEvent.type(passwordInput, "1234567");

    expect(submitButton).toBeDisabled();
  });
});
