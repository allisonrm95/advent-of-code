const fs = require('fs').promises;
const path = require('path');

const readData = async () => {
  const filePath = path.resolve(__dirname, 'C2input.txt');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.log(`Error in readData: ${error}`);
  }
};

const makeReports = async () => {
  const data = await readData();
  let allReports = [];
  let report = [];
  let currentLevel = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '\n' || !data[i + 1]) {
      currentLevel += data[i];
      report.push(parseInt(currentLevel));
      currentLevel = '';
      allReports.push(report);
      report = [];
    } else if (data[i] === ' ') {
      report.push(parseInt(currentLevel));
      currentLevel = '';
    } else {
      currentLevel += data[i];
    }
  }
  return allReports;
};

const findSafe = (allReports) => {
  let safeReports = 0;
  allReports.forEach((report) => {
    if (analyze(report)) safeReports++;
  });
  return safeReports;
};

const analyze = (report) => {
  if (report[0] === report[1]) {
    return false;
  }
  let safe = true;
  let increasing = report[0] < report[1];
  let decreasing = report[0] > report[1];

  if (decreasing) {
    for (let i = 1; i < report.length; i++) {
      let diff = report[i - 1] - report[i];
      if (diff > 3 || diff < 1) {
        safe = false;
      }
    }
  }
  if (increasing) {
    for (let i = 1; i < report.length; i++) {
      let diff = report[i] - report[i - 1];
      if (diff > 3 || diff < 1) {
        safe = false;
      }
    }
  }
  return safe;
};

const main = async () => {
  const reports = await makeReports();
  const safeTally = findSafe(reports);
  console.log(safeTally);
  return safeTally;
};
main();
