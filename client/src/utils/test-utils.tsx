import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach } from "vitest";
import { server } from "../mocks/server";
import { store } from "../redux/store";

afterEach(cleanup);

// Reset msw state between tests
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

// Reset redux state between tests
beforeEach(() => {
  store.dispatch({ type: "user/reset" })
  store.dispatch({ type: "parcels/reset" })
})

/**
 * Login user if needed
 */
export function login() {
  store.dispatch({
    type: "user/login",
    payload: {
      email: "test@test.com",
      password: "123",
    },
  })
}

function customRender(ui: React.ReactElement, options?: any) {
  return render(ui, {
    wrapper: ({ children }) => (
      // Not actually properly mocking anything.
      // Just trying to get things up and running.
      <Provider store={options?.store ?? store}>
        <QueryClientProvider
          client={
            new QueryClient({
              logger: {
                error: () => { },
                log: () => { },
                warn: () => { },
              },
            })
          }
        >
          <MemoryRouter initialEntries={options?.initialEntries ?? ["/"]}>
            {children}
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    ),
    ...options,
  });
}
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };

