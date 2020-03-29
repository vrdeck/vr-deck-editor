import React from "react";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import App from "./App";
import { UserSlice } from "./features/user/userSlice";

const mockStore = configureStore([thunk]);

const renderComponent = (userStore: UserSlice) =>
  render(
    <Provider store={mockStore({ user: userStore })}>
      <App />
    </Provider>
  );

test("renders learn react link", () => {
  const { getByText } = renderComponent({
    user: { email: "alice@example.com", name: "Alice" },
    userLoading: false
  });

  const linkElement = getByText(/VR Deck is cool./i);
  expect(linkElement).toBeInTheDocument();
});
