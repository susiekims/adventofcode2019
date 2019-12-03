const { getMatrixDimensions } = require("./index");

describe("Get matrix dimensions", () => {
  test("should return width: 10, height: 10", () => {
    expect(getMatrixDimensions(["R20", "L10", "U20", "D10"])).toStrictEqual([
      10,
      10
    ]);
  });
});
