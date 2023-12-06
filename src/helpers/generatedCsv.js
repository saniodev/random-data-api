const fs = require('fs');
const csv = require('csv-parser');
const CSV_FILE_PATH = './src/csv/users.csv';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const createdCsvFile = async (userData) => {
  const users = [];
  if (fs.existsSync(CSV_FILE_PATH)) {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on("data", (row) => users.push(row))
      .on("end", () => {
        const existingUserIndex = users.findIndex(
          (user) => user.user_Id === userData.user_Id
        );

        if (existingUserIndex !== -1) {
          users[existingUserIndex] = userData;
        } else {
          users.push(userData);
        }

        const csvWriter = createCsvWriter({
          path: CSV_FILE_PATH,
          header: Object.keys(users[0]).map((key) => ({ id: key, title: key })),
        });

        csvWriter.writeRecords(users);
      });
  } else {
    const csvWriter = createCsvWriter({
      path: CSV_FILE_PATH,
      header: Object.keys(userData).map((key) => ({ id: key, title: key })),
    });
    csvWriter.writeRecords([userData]);
  }
};

const readCsvFile = async () => {
  return new Promise((resolve, reject) => {
    const users = [];
    if (fs.existsSync(CSV_FILE_PATH)) {
      fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (row) => users.push(row))
        .on('end', () => {
          resolve(users);
        })
        .on('error', (error) => {
          reject(error);
        });
    } else {
      resolve(users);
    }
  });
};


module.exports = { readCsvFile, createdCsvFile };
