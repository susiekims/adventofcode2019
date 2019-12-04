/* 
--- Day 3: Crossed Wires ---
--- Part 1 ---
The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.

Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).

The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.

For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:

...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........
Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:

...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.

Here are a few more examples:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
What is the Manhattan distance from the central port to the closest intersection?
*/

const getInputs = require("../helpers/getInputs");

const inputs = getInputs("./input.txt", "\n").map(item => item.split(","));

// const line1 = inputs[0];
// const line2 = inputs[1];
const line1 = ["R8", "U5", "L5", "D3"];
const line2 = ["U7", "R6", "D4", "L4"];

const getPath = input => {
  let xPos = 0;
  let yPos = 0;
  let coordinates = [];
  for (let j = 0; j < input.length; j++) {
    let direction = input[j].charAt(0);
    let steps = parseInt(input[j].substring(1));

    if (direction === "R") {
      // coordinates.push(direction);
      for (let i = xPos + 1; i < steps + xPos; i++) {
        coordinates.push(`${i},${yPos}`);
      }
      xPos += steps;
    }

    if (direction === "L") {
      // coordinates.push(direction);

      for (let i = xPos - 1; i > xPos - steps; i--) {
        coordinates.push(`${i},${yPos}`);
      }
      xPos -= steps;
    }

    if (direction === "U") {
      // coordinates.push(direction);

      for (let i = yPos + 1; i < yPos + steps; i++) {
        coordinates.push(`${xPos},${i}`);
      }
      yPos += steps;
    }

    if (direction === "D") {
      // coordinates.push(direction);

      for (let i = yPos - 1; i > yPos - steps; i--) {
        coordinates.push(`${xPos},${i}`);
      }
      yPos -= steps;
    }
  }
  return coordinates;
};

const comparePaths = (line1, line2) => {
  let a = new Set(line1);
  let b = new Set(line2);
  let intersections = [...a].filter(x => b.has(x));

  const distances = intersections.map(intersection => {
    intersection = intersection.split(",");
    return Math.abs(intersection[0]) + Math.abs(intersection[1]);
  });
  return Math.min(...distances);
};

console.log(comparePaths(getPath(line1), getPath(line2)));
