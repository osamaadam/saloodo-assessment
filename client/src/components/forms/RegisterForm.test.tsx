import Register from "./RegisterForm";
import { render, screen, userEvent } from "../../utils/test-utils";

describe("RegisterForm", () => {
  it("renders", () => {
    render(<Register />);
    const form = screen.getByTestId("register-form");
    expect(form).toBeInTheDocument();
  });

  it("is disabled until valid", () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
  });

  it("is enabled if all valid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await userEvent.type(firstNameInput, "validFirstName");
    await userEvent.type(lastNameInput, "validLastName");
    await userEvent.type(emailInput, "valid.email@test.com");
    await userEvent.type(passwordInput, "validPassword");
    await userEvent.type(confirmPasswordInput, "validPassword");

    expect(submitButton).toBeEnabled();
  });

  it("is disabled if email is invalid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await userEvent.type(firstNameInput, "validFirstName");
    await userEvent.type(lastNameInput, "validLastName");
    await userEvent.type(emailInput, "invalid email");
    await userEvent.type(passwordInput, "validPassword");
    await userEvent.type(confirmPasswordInput, "validPassword");

    expect(submitButton).toBeDisabled();
  });

  it("is disabled if password is invalid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await userEvent.type(firstNameInput, "validFirstName");
    await userEvent.type(lastNameInput, "validLastName");
    await userEvent.type(emailInput, "valid.email@test.com");
    await userEvent.type(passwordInput, "1234567");
    await userEvent.type(confirmPasswordInput, "1234567");

    expect(submitButton).toBeDisabled();
  });

  it("is disabled if password and confirm password do not match", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await userEvent.type(firstNameInput, "validFirstName");
    await userEvent.type(lastNameInput, "validLastName");
    await userEvent.type(emailInput, "valid.email@test.com");
    await userEvent.type(passwordInput, "validPassword");
    await userEvent.type(confirmPasswordInput, "invalidPassword");

    expect(submitButton).toBeDisabled();
  });
});
