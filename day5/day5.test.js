const { getOpcode, runTEST, getMode } = require("./index");

describe("TEST", () => {
  test("it should return 2", () => {
    expect(runTEST([3, 0, 4, 0, 99], 2)[0]).toBe(2);
  });
});

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

describe("getMode", () => {
  test("it should return 10", () => {
    expect(getMode(1002)).toBe(10);
  });

  test("it should return 100", () => {
    expect(getMode(10003)).toBe(100);
  });

  test("it should return 2", () => {
    expect(getMode(204)).toBe(2);
  });
});
