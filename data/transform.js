const fs = require('fs');
const path = require('path');

const makePath = (...args) => path.join(__dirname, ...args);

const tsvFiles = fs.readdirSync(makePath('tsv'))

for (const filename of tsvFiles) {
  const tsvFilepath = makePath('tsv', filename);
  const tsvRows = fs.readFileSync(tsvFilepath).toString().split("\n");
  const conversations = tsvRows.map((row) => {
    const [ userId, message, attachment ] = row.split('\t');
    return {
      message,
      userId: userId || null,
      attachment: attachment || null,
    };
  });
  const jsonFilepath = makePath('json', filename.replace(".tsv", ".json"));
  fs.writeFileSync(jsonFilepath, JSON.stringify(conversations, null, 2));
}
