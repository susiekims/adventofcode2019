const { checkNumber, checkNumber2 } = require("./index");

describe("checkNumber", () => {
  test("should return true", () => {
    expect(checkNumber(111111)).toBe(true);
  });

  test("should return false", () => {
    expect(checkNumber(223450)).toBe(false);
  });

  test("should return false", () => {
    expect(checkNumber(123789)).toBe(false);
  });
});

describe("checkNumber2", () => {
  test("should return true", () => {
    expect(checkNumber2(112233)).toBe(true);
  });

  test("should return false", () => {
    expect(checkNumber2(123444)).toBe(false);
  });

  test("should return true", () => {
    expect(checkNumber2(111122)).toBe(true);
  });
});
