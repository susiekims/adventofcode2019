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

*/

const getInputs = require("../helpers/getInputs");

const inputs = getInputs("./input.txt", ",").map(Number);

const getOpcode = number => (number === 99 ? 99 : number % 10);

const getModes = number => {
  const modes = Math.floor(number / 100)
    .toString()
    .split("")
    .map(Number)
    .reverse();

  if (modes.length < 3) {
    modes.push(0);
  }

  return modes;
};

const modes = {
  position: 0,
  immediate: 1,
  relative: 2
};

const getValueFromMode = (program, mode) => {
  const { position, immediate, relative } = modes;
  if (mode === position) {
    program[program[i + 1]];
  }

  if (mode === immediate) {
    program[i + 1];
  }
};

const Intcode = (program, input = []) => {
  let i = 0;
  let relativeBase = 0;
  while (i < program.length) {
    const opcode = getOpcode(program[i]);
    const modes = getModes(program[i]);
    const param = program[i + 1];
    const val3 = program[i + 3];

    let val1, val2;

    if (modes[0] === 0) {
      val1 = program[program[i + 1]];
    }

    if (modes[0] === 1) {
      val1 = program[i + 1];
    }

    if (modes[1] === 0) {
      val2 = program[program[i + 2]];
    }

    if (modes[1] === 1) {
      val2 = program[i + 2];
    }

    if (modes[0] === 2) {
      val1 = program[relativeBase + program[i + 1]] + relativeBase;
    }

    switch (opcode) {
      case 1:
        program[val3] = val1 + val2;
        i += 4;
        break;
      case 2:
        program[val3] = val1 * val2;
        i += 4;
        break;
      case 3:
        program[param] = input.shift();
        i += 2;
        break;
      case 4:
        program[0] = val1;
        i += 2;
        break;
      case 5:
        i = val1 !== 0 ? val2 : i + 3;
        break;
      case 6:
        i = val1 === 0 ? val2 : i + 3;
        break;
      case 7:
        program[val3] = val1 < val2 ? 1 : 0;
        i += 4;
        break;
      case 8:
        program[val3] = val1 === val2 ? 1 : 0;
        i += 4;
        break;
      case 9:
        relativeBase += param;
        i += 2;
        break;
      default:
        return program[0];
    }
  }

  return program[0];
};

module.exports = Intcode;
