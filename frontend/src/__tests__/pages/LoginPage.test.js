import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

afterEach(cleanup);

describe("Login Page", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(
      asFragment(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      )
    ).toMatchSnapshot();
  });
});
