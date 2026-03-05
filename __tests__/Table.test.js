import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../components/Table";

const mockFoods = [
  {
    food_id: "1",
    brand_name: "TestBrand",
    item_name: "Burger",
    nf_calories: 500,
    nf_protein: 25,
    nf_total_carbohydrate: 40,
    nf_total_fat: 28,
  },
  {
    food_id: "2",
    brand_name: "TestBrand",
    item_name: "Salad",
    nf_calories: 200,
    nf_protein: 10,
    nf_total_carbohydrate: 15,
    nf_total_fat: 8,
  },
  {
    food_id: "3",
    brand_name: "TestBrand",
    item_name: "Fries",
    nf_calories: 300,
    nf_protein: 4,
    nf_total_carbohydrate: 40,
    nf_total_fat: 15,
  },
];

describe("Table", () => {
  it("renders brand name as heading", () => {
    render(<Table brandFoods={mockFoods} />);
    expect(screen.getByText("TestBrand")).toBeInTheDocument();
  });

  it("renders all food items", () => {
    render(<Table brandFoods={mockFoods} />);
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Fries")).toBeInTheDocument();
  });

  it("renders all column headers", () => {
    render(<Table brandFoods={mockFoods} />);
    expect(screen.getByText(/^Food/)).toBeInTheDocument();
    expect(screen.getByText(/Calories/)).toBeInTheDocument();
    expect(screen.getByText(/Protein \(g\)/)).toBeInTheDocument();
    expect(screen.getByText(/Carbs/)).toBeInTheDocument();
    expect(screen.getByText(/Fat \(g\)/)).toBeInTheDocument();
    expect(screen.getByText(/Protein kcal/)).toBeInTheDocument();
  });

  it("calculates protein ratio correctly", () => {
    render(<Table brandFoods={mockFoods} />);
    // Burger: (25 * 4) / 500 = 0.200, Salad: (10 * 4) / 200 = 0.200
    const ratios = screen.getAllByText("0.200");
    expect(ratios).toHaveLength(2);
    // Fries: (4 * 4) / 300 = 0.053
    expect(screen.getByText("0.053")).toBeInTheDocument();
  });

  it("sorts by column when header is clicked", () => {
    render(<Table brandFoods={mockFoods} />);

    const caloriesHeader = screen.getByText(/Calories/);
    fireEvent.click(caloriesHeader);

    const rows = screen.getAllByRole("row");
    // row 0 is header, data rows start at 1
    // Default sort on new column is "down" (descending)
    expect(rows[1]).toHaveTextContent("Burger");
    expect(rows[2]).toHaveTextContent("Fries");
    expect(rows[3]).toHaveTextContent("Salad");
  });
});
