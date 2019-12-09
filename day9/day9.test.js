const Intcode = require("./index");

describe("Intcode day7 pt1", () => {
  test("should output a 16-digit number", () => {
    expect(
      Intcode([1102, 34915192, 34915192, 7, 4, 7, 99, 0]).toString().length
    ).toBe(16);
  });

  test("should output the large number in the middle", () => {
    expect(Intcode([104, 1125899906842624, 99])).toBe(1125899906842624);
  });

  test("should return a copy of itself", () => {
    expect(
      Intcode([
        109,
        1,
        204,
        -1,
        1001,
        100,
        1,
        100,
        1008,
        100,
        16,
        101,
        1006,
        101,
        0,
        99
      ])
    ).toBe(true);
  });
});
