const runTEST = require("./index");

describe("TEST", () => {
  test("it should return 2", () => {
    expect(runTEST([3, 0, 4, 0, 99], 2)[0]).toBe(2);
  });
});
