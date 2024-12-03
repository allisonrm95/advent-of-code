const fs = require('fs').promises;
const path = require('path');

const readData = async () => {
  const filePath = path.resolve(__dirname, 'input.txt');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.log(`Error in readData: ${error}`);
  }
};

const reshapeAndStoreData = (inputData) => {
  const data = inputData.split(' ').join('').split('\n').join('');
  let left = true;
  const leftCache = {};
  const rightCache = {};
  const occurences = [];

  for (let i = 0; i < data.length; i += 5) {
    let current = parseInt(data.slice(i, i + 5));
    if (left === true) {
      leftCache[current] ? leftCache[current]++ : (leftCache[current] = 1);
    } else {
      rightCache[current] ? rightCache[current]++ : (rightCache[current] = 1);
    }
    left = !left;
  }

  for (entry in leftCache) {
    if (rightCache[entry]) {
      let total = leftCache[entry] * entry * rightCache[entry];
      occurences.push(total);
    }
  }
  return occurences;
};

// find sum of differences
const findSum = (occurences) => {
  const simSum = occurences.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return simSum;
};

// chain each step
const main = async () => {
  try {
    const data = await readData();
    const occurences = await reshapeAndStoreData(data);
    const simSum = findSum(occurences);
    return simSum;
  } catch (error) {
    console.log('error in main :', error);
  }
};
main();
