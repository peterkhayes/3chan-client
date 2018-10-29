const fs = require('fs');
const path = require('path');

const makePath = (...args) => path.join(__dirname, ...args);

const tsvFiles = fs.readdirSync(makePath('tsv'))

for (const filename of tsvFiles) {
  const tsvFilepath = makePath('tsv', filename);
  const tsvRows = fs.readFileSync(tsvFilepath).toString().split("\n");
  const conversations = tsvRows.map((row) => {
    const [ rawUserId, message, attachment ] = row.split('\t');

    if (!message && !attachment) {
      return null;
    }

    let userId = Number(rawUserId);
    if (isNaN(userId)) userId = rawUserId.charCodeAt(0) - 71;
    if (isNaN(userId)) userId = null;

    return {
      message,
      userId,
      attachment: attachment || null,
    };
  }).filter(Boolean);

  const chatJson = JSON.stringify(conversations, null, 4);
  const output = `module.exports = ${chatJson};`;
  const jsFilepath = makePath('../src/chats', filename.replace(".tsv", ".js"));
  fs.writeFileSync(jsFilepath, output);
}
