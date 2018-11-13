const fs = require('fs');
const path = require('path');

const makePath = (...args) => path.join(__dirname, ...args);

const tsvFiles = fs.readdirSync(makePath('chat_tsvs'))

for (const filename of tsvFiles) {
  const tsvFilepath = makePath('chat_tsvs', filename);
  const tsvRows = fs.readFileSync(tsvFilepath).toString().split("\n");
  const conversations = tsvRows.map((row) => {
    const [ rawUserId, text, image ] = row.split('\t');

    if (!text && !image) {
      return null;
    }

    let userId = null;
    if (rawUserId && !isNaN(Number(rawUserId))) {
      userId = Number(rawUserId);
    } else if (rawUserId && rawUserId.charCodeAt(0) >= 65) {
      userId = rawUserId.charCodeAt(0) - 65;
    }

    return {
      text,
      userId,
      image: image || null,
      imageTitle: null,
    };
  }).filter(Boolean);

  const chatJson = JSON.stringify(conversations, null, 4);
  const output = `module.exports = ${chatJson};`;
  const jsFilepath = makePath('../src/phases/chats', filename.replace(".tsv", ".js"));
  fs.writeFileSync(jsFilepath, output);
}
