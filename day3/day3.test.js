const { comparePaths, getShortestSteps, getPath } = require("./index");

describe("comparePaths", () => {
  test("should return 6", () => {
    let line1 = ["R8", "U5", "L5", "D3"];
    let line2 = ["U7", "R6", "D4", "L4"];
    expect(comparePaths(getPath(line1), getPath(line2))).toBe(6);
  });

  test("should return 159", () => {
    let line1 = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
    let line2 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
    expect(comparePaths(getPath(line1), getPath(line2))).toBe(159);
  });

  test("should return 135", () => {
    let line1 = [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ];
    let line2 = [
      "U98",
      "R91",
      "D20",
      "R16",
      "D67",
      "R40",
      "U7",
      "R15",
      "U6",
      "R7"
    ];
    expect(comparePaths(getPath(line1), getPath(line2))).toBe(135);
  });
});

describe("getShortestSteps", () => {
  test("should return 30", () => {
    let line1 = ["R8", "U5", "L5", "D3"];
    let line2 = ["U7", "R6", "D4", "L4"];
    expect(getShortestSteps(getPath(line1), getPath(line2))).toBe(30);
  });

  test("should return 610", () => {
    let line1 = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
    let line2 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
    expect(getShortestSteps(getPath(line1), getPath(line2))).toBe(610);
  });

  test("should return 410", () => {
    let line1 = [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ];
    let line2 = [
      "U98",
      "R91",
      "D20",
      "R16",
      "D67",
      "R40",
      "U7",
      "R15",
      "U6",
      "R7"
    ];
    expect(getShortestSteps(getPath(line1), getPath(line2))).toBe(410);
  });
});
