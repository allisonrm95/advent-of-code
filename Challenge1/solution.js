// import * as fs from 'fs';
const fs = require('fs').promises;
const path = require('path');
/**
 * read txt file
 * turn into two separate arrays
 * --> Set or Map auxilliary object (one retains original order, one might order them)
 * if just arrays, use .sort() to sort
 *
 * iterate through and store abs val of difference in output array
 * use reduce on output array to find total
 *  */

//Read txt file and
const readData = async () => {
  const filePath = path.resolve(__dirname, 'input.txt');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const noSpace = data.split(' ').join('');
    const noNewLine = noSpace.split('\n').join('');

    return noNewLine;
  } catch (error) {
    console.log(`Error in readData: ${error}`);
  }
};

const reshapeData = (data) => {
  let left = true;
  let l = [];
  let r = [];
  let current = '';
  let counter = 1;
  for (let i = 0; i < data.length; i++) {
    current += data[i];
    if (counter === 5) {
      console.log('current', current);
      if (left === true) {
        l.push(parseInt(current));
      }
      if (left === false) {
        r.push(parseInt(current));
      }
      left = !left;
      counter = 0;
      current = [];
    }
    counter++;
  }
  return [l, r];
};

const orderData = (nestedArr) => {
  let left = nestedArr[0].sort();
  let right = nestedArr[1].sort();
  return [left, right];
};

const findDiff = (nestedArr) => {
  let left = nestedArr[0];
  let right = nestedArr[1];
  let differences = [];
  for (let i = 0; i < left.length; i++) {
    differences.push(Math.abs(left[i] - right[i]));
  }
  return differences;
};

const findSum = (diffArr) => {
  const diffSum = diffArr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  console.log('diffSum', diffSum);
  return diffSum;
};

const main = async () => {
  try {
    const data = await readData();
    const leftAndRight = await reshapeData(data);
    const orderedData = orderData(leftAndRight);
    const differences = findDiff(orderedData);
    const diffSum = findSum(differences);
    return diffSum;
  } catch (error) {
    console.log('error in main :', error);
  }
};

main();
