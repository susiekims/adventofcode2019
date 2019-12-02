const { getFuelRequirements, getAdditionalFuel } = require("./index.js");

test("a mass of 12 should return 2", () => {
  expect(getFuelRequirements(12)).toBe(2);
});

test("a mass of 14 should return 4", () => {
  expect(getFuelRequirements(14)).toBe(2);
});

test("a mass of 1969 should return 654", () => {
  expect(getFuelRequirements(1969)).toBe(654);
});

test("a mass of 12 should return 2", () => {
  expect(getAdditionalFuel(12)).toBe(2);
});

test("a mass of 1969 should return 966", () => {
  expect(getAdditionalFuel(1969)).toBe(966);
});
