/* 
--- Day 6: Universal Orbit Map ---
You've landed at the Universal Orbit Map facility on Mercury. Because navigation in space often involves transferring between orbits, the orbit maps here are useful for finding efficient routes between, for example, you and Santa. You download a map of the local orbits (your puzzle input).

Except for the universal Center of Mass (COM), every object in space is in orbit around exactly one other object. An orbit looks roughly like this:

                  \
                   \
                    |
                    |
AAA--> o            o <--BBB
                    |
                    |
                   /
                  /
In this diagram, the object BBB is in orbit around AAA. The path that BBB takes around AAA (drawn with lines) is only partly shown. In the map data, this orbital relationship is written AAA)BBB, which means "BBB is in orbit around AAA".

Before you use your map data to plot a course, you need to make sure it wasn't corrupted during the download. To verify maps, the Universal Orbit Map facility uses orbit count checksums - the total number of direct orbits (like the one shown above) and indirect orbits.

Whenever A orbits B and B orbits C, then A indirectly orbits C. This chain can be any number of objects long: if A orbits B, B orbits C, and C orbits D, then A indirectly orbits D.

For example, suppose you have the following map:

COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L

B: ["COM"],
C: ["B", "COM"],
D: ["C", "B", "COM"],
E: ["D", "C", "B", "COM"],
F: ["E", "D", "C", "B", "COM"],
G: ["B", "COM"],
H: ["G", "B", "COM"],
I: ["D", "C", "B", "COM"],
J: ["E", "D", "C", "B", "COM"],
K: ["J", "E", "D", "C", "B", "COM"],
L: ["K", "J", "E", "D", "C", "B", "COM"]


Visually, the above map of orbits looks like this:

        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I
In this visual representation, when two objects are connected by a line, the one on the right directly orbits the one on the left.

Here, we can count the total number of orbits as follows:

D directly orbits C and indirectly orbits B and COM, a total of 3 orbits.
L directly orbits K and indirectly orbits J, E, D, C, B, and COM, a total of 7 orbits.
COM orbits nothing.
The total number of direct and indirect orbits in this example is 42.

What is the total number of direct and indirect orbits in your map data?
*/

const getInputs = require("../helpers/getInputs");

const inputs = getInputs("./input.txt", "\n").map(input => input.split(")"));

const createMap = orbits => {
  return orbits.reduce((acc, curr) => {
    if (acc[curr[0]]) {
      acc[curr[0]] = [...acc[curr[0]], curr[1]];
    } else {
      acc[curr[0]] = [curr[1]];
    }
    return acc;
  }, {});
};

const countOrbits = orbits => {
  let orbitsCount = 0;
  let start = "COM";

  const map = createMap(orbits);

  const countNodes = (node, level) => {
    orbitsCount += level;
    let children = map[node];

    if (children) {
      children.forEach(child => countNodes(child, level + 1));
    }
  };
  countNodes(start, 0);

  return orbitsCount;
};

console.log(countOrbits(inputs)); // 261306

/*

--- Part Two ---
Now, you just need to figure out how many orbital transfers you (YOU) need to take to get to Santa (SAN).

You start at the object YOU are orbiting; your destination is the object SAN is orbiting. An orbital transfer lets you move from any object to an object orbiting or orbited by that object.

For example, suppose you have the following map:

COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
Visually, the above map of orbits looks like this:

                          YOU
                         /
        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
In this example, YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required:

K to J
J to E
E to D
D to I
Afterward, the map of orbits looks like this:

        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
                 \
                  YOU
What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting? (Between the objects they are orbiting - not between YOU and SAN.)

*/

const getShortestTransfers = input => {
  const myParent = input.filter(input => input[1] === "YOU")[0][0];
  const santasParent = input.filter(input => input[1] === "SAN")[0][0];

  const map = createMap(input);
  const tree = Object.entries(map).reduce((tree, node) => {
    return Object.assign(
      tree,
      {
        [node[0]]: {
          value: node[0],
          left: node[1][0],
          right: node[1][1]
        }
      },
      {}
    );
  }, {});

  const lca = getlca(tree, "COM", myParent, santasParent);

  return (
    getLevelOfNode(tree, lca, myParent, 0) +
    getLevelOfNode(tree, lca, santasParent, 0)
  );
};

const getlca = (tree, root, n1, n2) => {
  if (!tree[root]) return null;

  if (tree[root].value === n1 || tree[root].value == n2)
    return tree[root].value;

  const leftlca = getlca(tree, tree[root].left, n1, n2);
  const rightlca = getlca(tree, tree[root].right, n1, n2);

  if (leftlca && rightlca) return tree[root].value;

  return leftlca ? leftlca : rightlca;
};

const getLevelOfNode = (tree, root, key, level) => {
  if (!tree[root]) return -1;

  if (tree[root].value == key) return level;

  const l = getLevelOfNode(tree, tree[root].left, key, level + 1);
  if (l !== -1) return l;

  return getLevelOfNode(tree, tree[root].right, key, level + 1);
};

console.log(getShortestTransfers(inputs)); // 382

// Disclaimer: I am not familiar with working with trees so I had a lot of trouble with these problems. This tutorial https://www.youtube.com/watch?v=Ev83cGBsQSA was very helpful, and I learned a lot about binary trees!

module.exports = { countOrbits, getShortestTransfers };
