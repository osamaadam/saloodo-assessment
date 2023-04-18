import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { afterEach } from "vitest";
import { store } from "../redux/store";

afterEach(cleanup);

function customRender(ui: React.ReactElement, options?: any) {
  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <Router>{children}</Router>
        </QueryClientProvider>
      </Provider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
