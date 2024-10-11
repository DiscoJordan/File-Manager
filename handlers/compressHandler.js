import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream, access } from "node:fs";
import os from "node:os";
import { cwd } from "node:process";
import path from "node:path";

const homeDir = os.homedir();

export const compressHandler = (ways) => {
  if (ways.length !== 2) {
    console.error("You should pass 2 arguments");
    return;
  }
  const sourceFilePath = ways[0].startsWith(homeDir)
    ? ways[0]
    : path.join(cwd(), ways[0]);

  const destinationDir = ways[1].startsWith(homeDir)
    ? ways[1]
    : path.join(cwd(), ways[1]);

  const destinationFilePath = path.join(
    destinationDir,
    `${path.basename(sourceFilePath, path.extname(sourceFilePath))}.gz`
  );

  access(sourceFilePath, (err) => {
    if (err) {
      console.error(`Error: source file "${sourceFilePath}" is net exist.`);
      return;
    }

    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(destinationFilePath);
    const gzip = createGzip();
    pipeline(sourceStream, gzip, destinationStream, (err) => {
      if (err) {
        console.error("Error:", err);
        process.exitCode = 1;
      } else {
        console.log('File was successfully zipped and saved as', destinationFilePath);
      }
    });
  });
};
