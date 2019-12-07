const { permute, getMaxSignal } = require("./index");

const testInput = [
  3,
  15,
  3,
  16,
  1002,
  16,
  10,
  16,
  1,
  16,
  15,
  15,
  4,
  15,
  99,
  0,
  0
];

describe("get max signal", () => {
  test("it should return 43210", () => {
    const permutations = permute([0, 1, 2, 3, 4]);
    expect(getMaxSignal(permutations, testInput)).toBe(43210);
  });
});
