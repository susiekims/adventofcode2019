const { countOrbits, getShortestTransfers } = require("./index");

const input = [
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L"
].map(orbit => orbit.split(")"));

describe("counting orbits", () => {
  test("it should return 42", () => {
    expect(countOrbits(input)).toBe(42);
  });
});

const input2 = [
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L",
  "K)YOU",
  "I)SAN"
];

describe("shortest transfers", () => {
  test("it should return 4", () => {
    expect(getShortestTransfers(input2)).toBe(4);
  });
});
