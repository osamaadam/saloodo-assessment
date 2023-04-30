import App from "../../App";
import { server } from "../../mocks/server";
import { store } from "../../redux/store";
import { render, screen, userEvent, waitFor } from "../../utils/test-utils";
import Register from "./RegisterForm";
import { rest } from "msw"

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

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };
}

describe("RegisterForm", () => {
  it("renders", () => {
    render(<Register />);
    const form = screen.getByTestId("register-form");
    expect(form).toBeInTheDocument();
  });

  describe("submission is disabled", () => {
    it("is disabled if all fields are empty", () => {
      render(<Register />);
      const submitButton = screen.getByRole("button");
      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the email is invalid", async () => {
      render(<Register />);
      const submitButton = screen.getByRole("button");

      await populateFields({ email: "invalid.email" });

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the password matches but is less than required length", async () => {
      render(<Register />);
      const submitButton = screen.getByRole("button");

      await populateFields({ password: "12", confirmPassword: "12" });

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the password is longer than required length but doesn't match", async () => {
      render(<Register />);
      const submitButton = screen.getByRole("button");

      await populateFields({
        password: "12345678",
        confirmPassword: "123456789",
      });

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if the first name is less than required length", async () => {
      render(<Register />);
      const submitButton = screen.getByRole("button");

      await populateFields({ firstName: "x" });

      expect(submitButton).toBeDisabled();
    });

    it("is disabled if last name is less than required length", async () => {
      render(<Register />);
      const submitButton = screen.getByRole("button");

      await populateFields({ lastName: "x" });

      expect(submitButton).toBeDisabled();
    });
  });

  it("is enabled if all valid", async () => {
    render(<Register />);

    const submitButton = screen.getByRole("button");
    await populateFields({});

    expect(submitButton).toBeEnabled();
  });

  describe("submission", () => {
    it("sets login after successful registration", async () => {
      render(<Register />);

      const submitButton = screen.getByRole("button");
      await populateFields({});

      await userEvent.click(submitButton);

      const state = store.getState();

      expect(state.user.isLoggedIn).toBe(true);
    });

    it("sets correct user informaton after successful registration", async () => {
      render(<Register />);

      const submitButton = screen.getByRole("button");
      const inputUser = await populateFields({});

      await userEvent.click(submitButton);

      const state = store.getState();

      expect(state.user.user?.email).toBe(inputUser.email);
      expect(state.user.user?.firstName).toBe(inputUser.firstName);
      expect(state.user.user?.lastName).toBe(inputUser.lastName);
    });

    it("sets user tokens after successful registration", async () => {
      render(<Register />);

      const submitButton = screen.getByRole("button");
      await populateFields({});

      await userEvent.click(submitButton);

      const state = store.getState();

      expect(state.user.accessToken).toBeTruthy();
      expect(state.user.refreshToken).toBeTruthy();
    });
  });

  describe("post-registration (integration tests)", () => {
    it("redirects to the dashboard after successful registration", async () => {
      render(<App />, { initialEntries: ['/signup'] });

      await waitFor(() => expect(screen.getByTestId("register-form")).toBeInTheDocument())

      const submitButton = screen.getByRole("button", { name: /sign up/i });
      await populateFields({});

      await userEvent.click(submitButton);

      expect(await screen.findByTestId("dashboard-table")).toBeInTheDocument();
    })

    it("doesn't redirect to the dashboard after failed registration", async () => {
      render(<App />, { initialEntries: ['/signup'] });

      server.use(
        rest.post("/auth/register", (_, res, ctx) => {
          return res(ctx.status(400))
        })
      )

      await waitFor(() => expect(screen.getByTestId("register-form")).toBeInTheDocument())

      const submitButton = screen.getByRole("button", { name: /sign up/i });
      await populateFields({});

      await userEvent.click(submitButton);

      expect(await screen.findByTestId("register-form")).toBeInTheDocument();
    })
  })
});
