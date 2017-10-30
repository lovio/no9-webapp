import fs from 'fs';

// fp: filePath
// fs.existsSync is deprecated
export function readFile(fp) {
  try {
    fs.accessSync(fp);
    const config = require(fp);
    return config;
  } catch (err) {
    return undefined;
  }
}
