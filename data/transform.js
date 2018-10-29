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
  const chatJson = JSON.stringify(conversations, null, 4);
  const output = `module.exports = ${chatJson};`;
  const jsFilepath = makePath('../src/chats', filename.replace(".tsv", ".js"));
  fs.writeFileSync(jsFilepath, output);
}
