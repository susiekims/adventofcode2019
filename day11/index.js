/*

--- Day 11: Space Police ---
On the way to Jupiter, you're pulled over by the Space Police.

"Attention, unmarked spacecraft! You are in violation of Space Law! All spacecraft must have a clearly visible registration identifier! You have 24 hours to comply or be sent to Space Jail!"

Not wanting to be sent to Space Jail, you radio back to the Elves on Earth for help. Although it takes almost three hours for their reply signal to reach you, they send instructions for how to power up the emergency hull painting robot and even provide a small Intcode program (your puzzle input) that will cause it to paint your ship appropriately.

There's just one problem: you don't have an emergency hull painting robot.

You'll need to build a new emergency hull painting robot. The robot needs to be able to move around on the grid of square panels on the side of your ship, detect the color of its current panel, and paint its current panel black or white. (All of the panels are currently black.)

The Intcode program will serve as the brain of the robot. The program uses input instructions to access the robot's camera: provide 0 if the robot is over a black panel or 1 if the robot is over a white panel. Then, the program will output two values:

First, it will output a value indicating the color to paint the panel the robot is over: 0 means to paint the panel black, and 1 means to paint the panel white.
Second, it will output a value indicating the direction the robot should turn: 0 means it should turn left 90 degrees, and 1 means it should turn right 90 degrees.
After the robot turns, it should always move forward exactly one panel. The robot starts facing up.

The robot will continue running for a while like this and halt when it is finished drawing. Do not restart the Intcode computer inside the robot during this process.

For example, suppose the robot is about to start running. Drawing black panels as ., white panels as #, and the robot pointing the direction it is facing (< ^ > v), the initial state and region near the robot looks like this:

.....
.....
..^..
.....
.....
The panel under the robot (not visible here because a ^ is shown instead) is also black, and so any input instructions at this point should be provided 0. Suppose the robot eventually outputs 1 (paint white) and then 0 (turn left). After taking these actions and moving forward one panel, the region now looks like this:

.....
.....
.<#..
.....
.....
Input instructions should still be provided 0. Next, the robot might output 0 (paint black) and then 0 (turn left):

.....
.....
..#..
.v...
.....
After more outputs (1,0, 1,0):

.....
.....
..^..
.##..
.....
The robot is now back where it started, but because it is now on a white panel, input instructions should be provided 1. After several more outputs (0,1, 1,0, 1,0), the area looks like this:

.....
..<#.
...#.
.##..
.....
Before you deploy the robot, you should probably have an estimate of the area it will cover: specifically, you need to know the number of panels it paints at least once, regardless of color. In the example above, the robot painted 6 panels at least once. (It painted its starting panel twice, but that panel is still only counted once; it also never painted the panel it ended on.)

Build a new emergency hull painting robot and run the Intcode program on it. How many panels does it paint at least once?
*/

const getInputs = require("../helpers/getInputs");

const inputs = getInputs("./input.txt", ",").map(Number);

const Intcode = require("../day9/index");

const outputs = Intcode(inputs);

const directions = {
  up: 0,
  right: 90,
  down: 180,
  left: 270
};

const countPanels = orgInstructions => {
  const instructions = [];
  let robotX = 0;
  let robotY = 0;
  let robotDirection = 0;
  let color = 0;

  const coords = [];

  const { up, down, right, left } = directions;

  while (orgInstructions.length > 0) {
    instructions.push(orgInstructions.splice(0, 2));
  }

  for (let i = 0; i < instructions.length; i++) {
    const newColor = instructions[i][0];
    const direction = instructions[i][1];

    coords.push([robotX, robotY]);

    if (direction === 0) {
      robotDirection -= 90;
    } else {
      robotDirection += 90;
    }

    if (robotDirection === 360) {
      robotDirection = 0;
    }

    if (robotDirection < 0) {
      robotDirection = 360 + robotDirection;
    }

    switch (Math.abs(robotDirection)) {
      case up:
        robotY -= 1;
        break;
      case down:
        robotY += 1;
        break;
      case left:
        robotX -= 1;
        break;
      case right:
        robotX += 1;
        break;
    }

    color = newColor;
  }

  return coords;
};

console.log(countPanels([0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0]));
