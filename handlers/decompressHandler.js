import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import os from "node:os";
import { cwd } from "node:process";
import path from "node:path";

const homeDir = os.homedir();

export const decompressHandler = (ways) => {
  try {
    if (ways.length !== 2) {
      console.error("You should pass 2 arguments");
    }
    const gunzip = createGunzip();
    const sourceFilePath = ways[0].startsWith(homeDir)
      ? ways[0]
      : path.join(cwd(), ways[0]);
    const destinationDir = ways[1].startsWith(homeDir)
      ? ways[1]
      : path.join(cwd(), ways[1]);
    const destinationFilePath = path.join(
      destinationDir,
      path.basename(sourceFilePath, ".gz")
    );
    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(destinationFilePath);

    pipeline(sourceStream, gunzip, destinationStream, (err) => {
      if (err) {
        console.error("An error occurred:", err);
        process.exitCode = 1;
      } else {
        console.log("File was successfully unzipped");
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
