const fs = require('fs').promises;
const path = require('path');

//read txt file and remove ' ' and '\n'
const readData = async () => {
  const filePath = path.resolve(__dirname, 'input.txt');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const noSpace = data.split(' ').join('').split('\n').join('');
    return noSpace;
  } catch (error) {
    console.log(`Error in readData: ${error}`);
  }
};

//sort data into left and right arrays of numbers
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
  return [l, r];
};

// order left and right arrays
const orderData = (left, right) => {
  return [left.sort(), right.sort()];
};

// find difference between coordinating indices of left and right arrays
const findDiff = (left, right) => {
  let differences = [];
  for (let i = 0; i < left.length; i++) {
    differences.push(Math.abs(left[i] - right[i]));
  }
  return differences;
};

// find sum of differences
const findSum = (diffArr) => {
  const diffSum = diffArr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return diffSum;
};

// chain each step
const main = async () => {
  try {
    const data = await readData();
    const leftAndRight = await reshapeData(data);
    const orderedData = orderData(...leftAndRight);
    const differences = findDiff(...orderedData);
    const diffSum = findSum(differences);
    return diffSum;
  } catch (error) {
    console.log('error in main :', error);
  }
};

main();
