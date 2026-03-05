import { render, screen, fireEvent } from "@testing-library/react";
import BrandList from "../components/BrandList";

jest.mock("next/link", () => {
  return ({ children }) => children;
});

const mockBrands = [
  { name: "Burger King", slug: "burger-king" },
  { name: "McDonald's", slug: "mcdonalds" },
  { name: "Subway", slug: "subway" },
  { name: "Taco Bell", slug: "taco-bell" },
];

describe("BrandList", () => {
  it("renders all brands", () => {
    render(<BrandList brandsData={mockBrands} />);
    expect(screen.getByText("Burger King")).toBeInTheDocument();
    expect(screen.getByText("McDonald's")).toBeInTheDocument();
    expect(screen.getByText("Subway")).toBeInTheDocument();
    expect(screen.getByText("Taco Bell")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<BrandList brandsData={mockBrands} />);
    expect(screen.getByPlaceholderText("Search restaurants...")).toBeInTheDocument();
  });

  it("filters brands by search text", () => {
    render(<BrandList brandsData={mockBrands} />);
    const input = screen.getByPlaceholderText("Search restaurants...");
    fireEvent.change(input, { target: { value: "taco bell" } });

    expect(screen.getByText("Taco Bell")).toBeInTheDocument();
    expect(screen.queryByText("Burger King")).not.toBeInTheDocument();
    expect(screen.queryByText("McDonald's")).not.toBeInTheDocument();
  });

  it("shows all brands when search is cleared", () => {
    render(<BrandList brandsData={mockBrands} />);
    const input = screen.getByPlaceholderText("Search restaurants...");
    fireEvent.change(input, { target: { value: "taco" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.getByText("Burger King")).toBeInTheDocument();
    expect(screen.getByText("Taco Bell")).toBeInTheDocument();
  });

  it("handles fuzzy search with apostrophes and hyphens", () => {
    render(<BrandList brandsData={mockBrands} />);
    const input = screen.getByPlaceholderText("Search restaurants...");

    fireEvent.change(input, { target: { value: "mcdonalds" } });
    expect(screen.getByText("McDonald's")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "tacobell" } });
    expect(screen.getByText("Taco Bell")).toBeInTheDocument();
  });
});
