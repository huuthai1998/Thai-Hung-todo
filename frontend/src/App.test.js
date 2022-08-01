import { render, cleanup, screen } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("App init", () => {
  it("should render welcome page with nav bar", () => {
    render(<App />);
    expect(screen.getByAltText(/logo/i)).toBeTruthy();
    expect(screen.getByText(/Log in/i)).toBeTruthy();
    expect(screen.getByText(/Sign up/i)).toBeTruthy();
    expect(screen.getByText(/Get started/i)).toBeTruthy();
  });
});
