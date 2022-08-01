import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupPage from "../../pages/SignupPage";

afterEach(cleanup);

describe("Signup Page", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>
    );
    expect(
      asFragment(
        <BrowserRouter>
          <SignupPage />
        </BrowserRouter>
      )
    ).toMatchSnapshot();
  });
});
