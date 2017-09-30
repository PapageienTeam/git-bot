'use strict';

const fs = require('fs-extra');

async function loadConfig(FilePath) {
  let config = await fs.readJson(FilePath);
  for(let key in config) {
    process.env[key] = config[key];
  }
}

<<<<<<< HEAD
function getConfigByKey(Key) {
  return process.env[Key];
}

=======
>>>>>>> dda571b294d192e4133b46c9b2456c81e0095004

module.exports = {loadConfig};
