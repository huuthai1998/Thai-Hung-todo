import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";

afterEach(cleanup);

describe("NotFound Page", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(
      asFragment(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      )
    ).toMatchSnapshot();
  });
});
