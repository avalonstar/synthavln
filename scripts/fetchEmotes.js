const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const axios = require('axios');
const archiver = require('archiver');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const spritesheet = require('spritesheet-js');

const assetPath = path.join(__dirname, '../src/components/Emotes/assets');
const assetBackupPath = path.join(__dirname, '../public/backups');
const spriteFilename = 'emoteTexture';
const spritePath = path.join(__dirname, '../public/sprites');

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error.message, error);
});

const makeBackups = () =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(assetPath)) {
      console.log('No assets exist, skipping backup');
      resolve();
    }
    console.log('Backing up current asset directory');
    const output = fs.createWriteStream(
      path.join(assetBackupPath, `${Date.now()}.zip`),
    );
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    output.on('end', () => { });

    archive.on('warning', error => {
      if (error.code === 'ENOENT') {
        console.warn(error);
      } else {
        reject(error);
      }
    });
    archive.on('error', error => {
      reject(error);
    });

    archive.pipe(output);
    archive.directory(assetPath);
    archive.finalize();
  });

const cleanUpAssets = () =>
  new Promise((resolve, reject) => {
    console.log('Cleaning up assets directory');
    if (!fs.existsSync(assetPath)) {
      console.log('No assets exist, skipping cleanup');
      resolve();
    }
    rimraf(assetPath, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

const createAssetsDir = () =>
  new Promise((resolve, reject) => {
    console.log('Creating new assets directory and needed tree');
    mkdirp(assetPath, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });


const downloadEmote = async (id, code) => {
  const result = await axios({
    method: 'get',
    url: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/4.0`,
    responseType: 'stream'
  });
  return new Promise((resolve, reject) => {
    console.log(chalk.yellow(`Downloading emote ${id} (${code})`));
    try {
      const stream = fs.createWriteStream(path.join(assetPath, `${code}.png`),);
      stream.on('error', e => reject(e));
      stream.on('end', () => resolve());
      stream.on('finish', () => resolve());
      result.data.pipe(stream);
    } catch (e) {
      console.error('error downloading emote', e);
      reject(e);
    }
  });
}

const saveIdMap = content => {
  console.log('Saving emote idMap');
  fs.writeFileSync(
    path.join(assetPath, 'idMap.json'),
    JSON.stringify(content, null, 2),
  );
};  

const getEmoteData = async () => {
  console.log('Fetching emote data, this might take a few...');
  const result = await axios('https://api.twitchemotes.com/api/v4/channels/38981465')
  return new Promise((resolve, reject) => {
    try {
      const { emotes } = result.data;
      const idMap = {};
      const downloadRequests = [];
      emotes.forEach(async emote => {
        const { id, code } = emote;
        idMap[id] = code;
        downloadRequests.push(downloadEmote(id, code))
      });
      Promise.all(downloadRequests)
        .then(() => resolve(idMap))
        .catch(error => { 
          console.error(error); 
          reject(error); 
        })
    } catch(error) {
      console.error(error);
      reject(error);
    }
  });
}

const generateSpriteSheet = () =>
  new Promise((resolve, reject) => {
    console.log('Generating spritesheet...');
    spritesheet(path.join(assetPath, '/**/*.png'), {
        format: 'pixi.js',
        name: spriteFilename,
        path: spritePath,
        trim: true,
      },
      err => {
        if (err) reject(err);
        resolve();
      },
    );
  });

const updateEmoteAssetsAndGenerateSprite = async () => {
  try {
    await makeBackups();
    await cleanUpAssets();
    await createAssetsDir();
    const idMap = await getEmoteData();
    saveIdMap(idMap);
    await generateSpriteSheet();
    console.log(chalk.green('Assets fetch and spritesheet re-gen complete'));
  } catch (error) {
    console.log(chalk.red('Asset fetch/spritesheet re-gen failed'));
    console.error(error);
  }
}

updateEmoteAssetsAndGenerateSprite();