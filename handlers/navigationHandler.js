import { cwd } from "node:process";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const homeDir = os.homedir();

export const navigationHandler = (operation, dirPath) => {
  switch (operation) {
    case "up":
      if (cwd() === homeDir) {
        console.log("You cant go upper than root folder");
        break;
      } else {
        process.chdir(path.join(cwd(), "../"));
        break;
      }
    case "cd":
      if (dirPath.startsWith(homeDir)) {
        process.chdir(dirPath);
        break;
      } else {
        process.chdir(path.join(cwd(), dirPath));

        break;
      }

    case "ls":
      fs.readdir(cwd(), (err, files) =>
        files.forEach((file) => {
          {
            console.log(file);
            if (err) {
              throw new Error(err);
            }
          }
        })
      );
    default:
      break;
  }
};
