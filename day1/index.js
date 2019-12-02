const getInputs = require("../helpers/getInputs");
const inputs = getInputs("./input.txt");

// PART 1:
const getFuelRequirements = mass => Math.floor(mass / 3) - 2;

const sumOfFuelRequirements = inputs.reduce((acc, curr) => {
  return acc + getFuelRequirements(curr);
}, 0);

console.log(sumOfFuelRequirements);

// PART 2:
const getAdditionalFuel = mass => {
  const masses = [];
  let fuel = getFuelRequirements(mass);
  masses.push(fuel);

  while (getFuelRequirements(fuel) > 0) {
    fuel = getFuelRequirements(fuel);
    masses.push(fuel);
  }
  return masses.reduce((acc, curr) => acc + curr);
};

const sumOfAdditionalFuelRequirements = inputs.reduce((acc, curr) => {
  return acc + getAdditionalFuel(curr);
}, 0);

console.log(sumOfAdditionalFuelRequirements);

module.exports = { getFuelRequirements, getAdditionalFuel };
