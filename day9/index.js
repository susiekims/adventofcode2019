/*

--- Day 9: Sensor Boost ---
You've just said goodbye to the rebooted rover and left Mars when you receive a faint distress signal coming from the asteroid belt. It must be the Ceres monitoring station!

In order to lock on to the signal, you'll need to boost your sensors. The Elves send up the latest BOOST program - Basic Operation Of System Test.

While BOOST (your puzzle input) is capable of boosting your sensors, for tenuous safety reasons, it refuses to do so until the computer it runs on passes some checks to demonstrate it is a complete Intcode computer.

Your existing Intcode computer is missing one key feature: it needs support for parameters in relative mode.

Parameters in mode 2, relative mode, behave very similarly to parameters in position mode: the parameter is interpreted as a position. Like position mode, parameters in relative mode can be read from or written to.

The important difference is that relative mode parameters don't count from address 0. Instead, they count from a value called the relative base. The relative base starts at 0.

The address a relative mode parameter refers to is itself plus the current relative base. When the relative base is 0, relative mode parameters and position mode parameters with the same value refer to the same address.

For example, given a relative base of 50, a relative mode parameter of -7 refers to memory address 50 + -7 = 43.

The relative base is modified with the relative base offset instruction:

Opcode 9 adjusts the relative base by the value of its only parameter. The relative base increases (or decreases, if the value is negative) by the value of the parameter.
For example, if the relative base is 2000, then after the instruction 109,19, the relative base would be 2019. If the next instruction were 204,-34, then the value at address 1985 would be output.

Your Intcode computer will also need a few other capabilities:

The computer's available memory should be much larger than the initial program. Memory beyond the initial program starts with the value 0 and can be read or written like any other memory. (It is invalid to try to access memory at a negative address, though.)
The computer should have support for large numbers. Some instructions near the beginning of the BOOST program will verify this capability.
Here are some example programs that use these features:

109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99 takes no input and produces a copy of itself as output.
1102,34915192,34915192,7,4,7,99,0 should output a 16-digit number.
104,1125899906842624,99 should output the large number in the middle.
The BOOST program will ask for a single input; run it in test mode by providing it the value 1. It will perform a series of checks on each opcode, output any opcodes (and the associated parameter modes) that seem to be functioning incorrectly, and finally output a BOOST keycode.

Once your Intcode computer is fully functional, the BOOST program should report no malfunctioning opcodes when run in test mode; it should only output a single value, the BOOST keycode. What BOOST keycode does it produce?

Your puzzle answer was 2932210790

*/

const getInputs = require("../helpers/getInputs");

let inputs = getInputs("./input.txt", ",").map(Number);

const Intcode = (program, inputs = []) => {
  let relativeBase = 0;
  let outputs = [];

  const getValue = value => (program[value] == undefined ? 0 : program[value]);

  const getPosition = (mode, value) => {
    switch (mode) {
      case 0:
        return program[value];
      case 1:
        return value;
      case 2:
        return relativeBase + program[value];
    }
  };

  const getOpcode = number => (number === 99 ? 99 : number % 10);
  const getMode = (instruction, position) =>
    instruction[instruction.length - position]
      ? parseInt(instruction[instruction.length - position])
      : 0;

  for (let i = 0; i < program.length; i++) {
    const instruction = program[i].toString().split("");
    const opcode = getOpcode(program[i]);
    const mode1 = getMode(instruction, 3);
    const mode2 = getMode(instruction, 4);
    const mode3 = getMode(instruction, 5);
    const param1 = getPosition(mode1, i + 1);
    const param2 = getPosition(mode2, i + 2);
    const param3 = getPosition(mode3, i + 3);

    switch (opcode) {
      case 1:
        program[param3] = getValue(param1) + getValue(param2);
        i += 3;
        break;
      case 2:
        program[param3] = getValue(param1) * getValue(param2);
        i += 3;
        break;
      case 3:
        program[param3] = inputs.shift();
        i += 1;
        break;
      case 4:
        outputs.push(program[param1]);
        i += 1;
        break;
      case 5:
        i = getValue(param1) != 0 ? getValue(param2) - 1 : i + 2;
        break;
      case 6:
        i = getValue(param1) == 0 ? getValue(param2) - 1 : i + 2;
        break;
      case 7:
        program[param3] = getValue(param1) < getValue(param2) ? 1 : 0;
        i += 3;
        break;
      case 8:
        program[param3] = getValue(param1) == getValue(param2) ? 1 : 0;
        i += 3;
        break;
      case 9:
        relativeBase += getValue(param1);
        i += 1;
        break;
      case 99:
        console.log("end of program");
        return outputs;
      default:
        console.error("invalid opcode");
        return outputs;
    }
  }
  return output;
};

console.log(Intcode(inputs, [1]));
console.log(Intcode(inputs, [2]));

module.exports = Intcode;

// I had a lot of trouble with comprehending the instructions (as I usually do for the Intcode problems). I found https://github.com/agardes/AoC-2019/blob/master/day09.js was very helpful to refactor my computer to work correctly.
