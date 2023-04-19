import Register from "./RegisterForm";
import { render, screen, userEvent } from "../../utils/test-utils";

async function populateFields({
  firstName = "validFirstName",
  lastName = "validLastName",
  email = "valid.email@test.com",
  password = "validPassword",
  confirmPassword = "validPassword",
}: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}) {
  const firstNameInput = screen.getByLabelText("First Name");
  const lastNameInput = screen.getByLabelText("Last Name");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");

  // Not using a Promise.all because Formik detects that I'm testing and spams the output.
  await userEvent.type(firstNameInput, firstName);
  await userEvent.type(lastNameInput, lastName);
  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);
  await userEvent.type(confirmPasswordInput, confirmPassword);
}

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
    await populateFields({});

    expect(submitButton).toBeEnabled();
  });

  it("is disabled if email is invalid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");

    await populateFields({ email: "invalid.email" });

    expect(submitButton).toBeDisabled();
  });

  it("is disabled if password is invalid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");

    await populateFields({ password: "1234567" });

    expect(submitButton).toBeDisabled();
  });

  it("is disabled if password and confirm password do not match", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");

    await populateFields({
      password: "12345678",
      confirmPassword: "123456789",
    });

    expect(submitButton).toBeDisabled();
  });

  it("is disabled if first name is invalid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");

    await populateFields({ firstName: "x" });

    expect(submitButton).toBeDisabled();
  });

  it("is disabled if last name is invalid", async () => {
    render(<Register />);
    const submitButton = screen.getByRole("button");

    await populateFields({ lastName: "x" });

    expect(submitButton).toBeDisabled();
  });
});
