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
      let data = [];

      fs.readdir(cwd(), (err, files) => {
        if (err) {
          throw new Error(err);
        }

        files.forEach((file) => {
          const filePath = path.join(cwd(), file);
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error(`Ошибка при обработке ${file}: ${err.message}`);
              return;
            }
            data.push({
              Name: file,
              Type: stats.isDirectory() ? 'directory' : 'file'
            });
            if (data.length === files.length) {
              console.table(data);
            }
          });
        });
      });
    
    default:
      break;
  }
};
