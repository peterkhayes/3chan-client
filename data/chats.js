const fs = require('fs');
const path = require('path');

const makePath = (...args) => path.join(__dirname, ...args);

const tsvFiles = fs.readdirSync(makePath('chat_tsvs'))

for (const filename of tsvFiles) {
  const tsvFilepath = makePath('chat_tsvs', filename);
  const tsvRows = fs.readFileSync(tsvFilepath).toString().split("\n");
  const conversations = tsvRows.map((row) => {
    const [ userId, text, image ] = row.split('\t');

    if (!text && !image) {
      return null;
    }

    return {
      text,
      userId: userId || null,
      image: image || null,
      imageTitle: null,
    };
  }).filter(Boolean);

  const chatJson = JSON.stringify(conversations, null, 4);
  const output = `module.exports = ${chatJson};`;
  const jsFilepath = makePath('../src/phases/chats', filename.replace(".tsv", ".js"));
  fs.writeFileSync(jsFilepath, output);
}
