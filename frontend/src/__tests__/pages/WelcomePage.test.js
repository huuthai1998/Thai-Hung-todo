import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WelcomePage from "../../pages/WelcomePage";

afterEach(cleanup);

describe("Welcome Page", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    expect(
      asFragment(
        <BrowserRouter>
          <WelcomePage />
        </BrowserRouter>
      )
    ).toMatchSnapshot();
  });
});
