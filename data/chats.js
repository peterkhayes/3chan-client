const fs = require('fs');
const path = require('path');
const imageDownloader = require('image-downloader');

const makePath = (...args) => path.join(__dirname, ...args);

const tsvFiles = fs.readdirSync(makePath('chat_tsvs'))

async function downloadChat(filename) {
  const tsvFilepath = makePath('chat_tsvs', filename);
  const tsvRows = fs.readFileSync(tsvFilepath).toString().split("\n");
  
  const images = [];
  const conversations = await Promise.all(tsvRows.map(async (row, i) => {
    let [ userId, text, image ] = row.split('\t');

    if (!text && !image) {
      return null;
    }

    // Multiline text messages end up quoted
    if (text && text[0] === '"' && text[text.length - 1] === '"') {
      text = text.slice(1, -1);
    }

    let imageData = null;
    if (image) {
      if (image.includes("/")) {
        let ext = path.extname(image);
        if (ext.indexOf("?") >= 0) ext = ext.slice(0, ext.indexOf("?"));
        if (ext === '.jpeg') ext = '.jpg';
        if (!['.png', '.jpg', '.gif'].includes(image)) {
          ext = '.jpg';
        }

        const imageFilename = `${filename.replace('.tsv', `-${i}`)}${ext}`; 
        const imageDest = makePath('../src/phases/chats/images', imageFilename)
        
        if (!fs.existsSync(imageDest)) {
          await imageDownloader.image({
            url: image,
            dest: imageDest,
          });
        }
        imageData = {
          importPath: `./images/${imageFilename}`,
          importName: `image_${i}`,
        }
      } else {
        imageData = {
          importPath: `./images/${image}`,
          importName: `image_${i}`,
        }
      }

      images.push(imageData);
    }

    return {
      text,
      userId: userId || null,
      image: imageData ? imageData.importName : null,
      imageTitle: null,
    };
  }).filter(Boolean));


  const imports = images
    .map(({importPath, importName}) => `import ${importName} from '${importPath}';`)
    .join("\n");
  let chatJson = JSON.stringify(conversations, null, 4);
  chatJson = chatJson
    .replace(/"image_(\d+)"/g, "image_$1")
    .replace(/\\\\n/g, "\\n");
  const output = `
// @flow
${imports}

export default ${chatJson};
  `.trim();

  const jsFilepath = makePath('../src/phases/chats', filename.replace(".tsv", ".js"));
  fs.writeFileSync(jsFilepath, output);
}

for (const filename of tsvFiles) {
  downloadChat(filename);
}
