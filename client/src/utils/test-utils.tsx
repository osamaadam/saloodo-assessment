import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { afterEach } from "vitest";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

afterEach(cleanup);

function customRender(ui: React.ReactElement, options?: any) {
  return render(ui, {
    wrapper: ({ children }) => (
      // Not actually properly mocking anything.
      // Just trying to get things up and running.
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <QueryClientProvider client={new QueryClient()}>
            <Router>{children}</Router>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
