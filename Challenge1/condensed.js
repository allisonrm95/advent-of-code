const fs = require('fs').promises;
const path = require('path');

//read txt file and remove ' ' and '\n'
const readData = async () => {
  const filePath = path.resolve(__dirname, 'input.txt');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const noSpace = data.split(' ').join('').split('\n').join('');
    return reshapeData(noSpace);
  } catch (error) {
    console.log(`Error in readData: ${error}`);
  }
};

const reshapeData = (data) => {
  let left = true;
  let l = [];
  let r = [];
  let current = '';

  for (let i = 0; i < data.length; i += 5) {
    current += data.slice(i, i + 5);
    left === true ? l.push(parseInt(current)) : r.push(parseInt(current));
    left = !left;
    current = '';
  }
  return findDiffSum(l.sort(), r.sort());
};

const findDiffSum = (left, right) => {
  let differences = [];
  for (let i = 0; i < left.length; i++) {
    differences.push(Math.abs(left[i] - right[i]));
  }
  const diffSum = differences.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return diffSum;
};

const sum = await readData();
console.log(sum);
