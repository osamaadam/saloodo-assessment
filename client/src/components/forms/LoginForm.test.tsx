import { rest } from "msw";
import App from "../../App";
import { server } from "../../mocks/server";
import { store } from "../../redux/store";
import { render, screen, userEvent, waitFor } from "../../utils/test-utils";
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

  describe("submission is enabled", () => {
    it("when all fields are valid", async () => {
      render(<Login />);

      const submitButton = screen.getByRole("button");
      await populateFields({});

      expect(submitButton).toBeEnabled();
    });

    it("sets login state in the redux store after successful login", async () => {
      render(<Login />);

      const submitButton = screen.getByRole("button");
      await populateFields({});

      await userEvent.click(submitButton);

      const state = store.getState();

      expect(state.user.isLoggedIn).toBe(true);
    });

    it("doesn't set login state in the redux store after failed login", async () => {
      render(<Login />);
      server.use(
        rest.post("/auth/login", (_, res, ctx) => res.once(ctx.status(401)))
      );

      const submitButton = screen.getByRole("button");
      await populateFields({});

      await userEvent.click(submitButton);

      const state = store.getState();

      expect(state.user.isLoggedIn).toBe(false);
    });

    it("shows error message after failed login", async () => {
      render(<Login />);
      server.use(
        rest.post("/auth/login", (_, res, ctx) => res.once(ctx.status(401)))
      );

      const submitButton = screen.getByRole("button");
      await populateFields({});

      await userEvent.click(submitButton);

      const errorMessage = await screen.findAllByText(
        /invalid email or password/i
      );

      expect(errorMessage?.length).toBeGreaterThan(0);
    });
  });

  describe("redirections (integration tests)", () => {
    it("redirects to home page after successful login", async () => {
      render(<App />, { initialEntries: ["/login"] })

      await waitFor(() => screen.findByText(/login/i))

      const submitButton = await screen.findByRole("button", { name: /login/i });
      await populateFields({});

      await userEvent.click(submitButton);

      expect(screen.getByText(/logout/i)).toBeInTheDocument()
    })

    it("doesn't redirect to home page after failed login", async () => {
      render(<App />, { initialEntries: ["/login"] })

      await waitFor(() => screen.findByText(/login/i))

      server.use(
        rest.post("/auth/login", (_, res, ctx) => res.once(ctx.status(401)))
      );

      const submitButton = await screen.findByRole("button", { name: /login/i });
      await populateFields({});

      await userEvent.click(submitButton);

      waitFor(async () => await screen.findByText(/invalid/i))

      expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
  })
});
