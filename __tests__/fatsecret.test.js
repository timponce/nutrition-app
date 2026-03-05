const { parseDescription } = require("../lib/fatsecret");

describe("parseDescription", () => {
  it("parses a standard food description", () => {
    const desc =
      "Per 1 serving - Calories: 590kcal | Fat: 34.00g | Carbs: 45.00g | Protein: 25.00g";
    const result = parseDescription(desc);

    expect(result).toEqual({
      nf_calories: 590,
      nf_total_fat: 34,
      nf_total_carbohydrate: 45,
      nf_protein: 25,
    });
  });

  it("parses decimal values", () => {
    const desc =
      "Per 100g - Calories: 123.5kcal | Fat: 4.25g | Carbs: 12.75g | Protein: 8.50g";
    const result = parseDescription(desc);

    expect(result).toEqual({
      nf_calories: 123.5,
      nf_total_fat: 4.25,
      nf_total_carbohydrate: 12.75,
      nf_protein: 8.5,
    });
  });

  it("returns zeros for empty string", () => {
    const result = parseDescription("");

    expect(result).toEqual({
      nf_calories: 0,
      nf_total_fat: 0,
      nf_total_carbohydrate: 0,
      nf_protein: 0,
    });
  });

  it("returns zeros for malformed input", () => {
    const result = parseDescription("no nutrition info here");

    expect(result).toEqual({
      nf_calories: 0,
      nf_total_fat: 0,
      nf_total_carbohydrate: 0,
      nf_protein: 0,
    });
  });

  it("handles zero values", () => {
    const desc =
      "Per 1 can - Calories: 0kcal | Fat: 0.00g | Carbs: 0.00g | Protein: 0.00g";
    const result = parseDescription(desc);

    expect(result).toEqual({
      nf_calories: 0,
      nf_total_fat: 0,
      nf_total_carbohydrate: 0,
      nf_protein: 0,
    });
  });
});
