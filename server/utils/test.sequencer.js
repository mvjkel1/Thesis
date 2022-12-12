const TestSequencer = require('@jest/test-sequencer').default;
const path = require('path');

class CustomSequencer extends TestSequencer {
  sort(tests) {
    const orderPath = [
      path.join(__dirname, './../__tests__/users.test.js'),
      path.join(__dirname, './../__tests__/groups.test.js')
    ];
    console.log(orderPath);
    return tests.sort((testA, testB) => {
      const indexA = orderPath.indexOf(testA.path);
      const indexB = orderPath.indexOf(testB.path);

      if (indexA === indexB) return 0; // do not swap when tests both not specify in order.

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA < indexB ? -1 : 1;
    });
  }
}

module.exports = CustomSequencer;
