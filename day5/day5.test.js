const { getOpcode, getModes } = require("./index");

describe("getOpcode", () => {
  test("it should return 2", () => {
    expect(getOpcode(1002)).toBe(2);
  });

  test("it should return 3", () => {
    expect(getOpcode(10003)).toBe(3);
  });

  test("it should return 4", () => {
    expect(getOpcode(204)).toBe(4);
  });
});

describe("getModes", () => {
  test("it should return 0 1 0", () => {
    expect(getModes(1002)).toStrictEqual([0, 1, 0]);
  });

  test("it should return 2 2 2", () => {
    expect(getModes(22203)).toStrictEqual([2, 2, 2]);
  });
});
