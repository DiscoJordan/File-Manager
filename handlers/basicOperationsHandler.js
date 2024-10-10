import fs from "node:fs";
import os from "node:os";
import { cwd } from "node:process";
import path from "node:path";

const homeDir = os.homedir();
export const basicOperationHandler = (operation, args) => {
  switch (operation) {
    case "cat":
      const readableStream = fs.createReadStream(
        args[0].startsWith(homeDir) ? args[0] : path.join(cwd(), args[0]),
        { encoding: "utf8" }
      );
      readableStream.on("data", (chunk) => {
        console.log(chunk);
      });

      readableStream.on("error", (err) => {
        console.log(err);
      });
      break;
    case "add":
      fs.writeFile(`${cwd()}/${args[0]}`, "", (err) => {
        if (err) {
            console.error(`Error:  ${err.message}`);
        } else{
            console.log(`File ${args[0]} was added succesfuly`);
        }
      });
      break;
    case "rn":
      fs.stat(
        args[0].startsWith(homeDir) ? args[0] : path.join(cwd(), args[0]),
        function (err) {
          if (err) {
            console.error(`Error:  ${err.message}`);
          } else {
            fs.stat(
              args[1].startsWith(homeDir) ? args[1] : path.join(cwd(), args[1]),
              function (err) {
                if (err) {
                  fs.rename(
                    args[0].startsWith(homeDir)
                      ? args[0]
                      : path.join(cwd(), args[0]),
                    args[1].startsWith(homeDir)
                      ? args[1]
                      : path.join(cwd(), args[1]),
                    function (err) {
                      if (err) {
                        console.error(`Error:  ${err.message}`);
                      }
                    }
                  );
                  console.log(`File ${args[1]} was renamed succesfuly`);
                } else {
                    console.error(`Error:  ${err.message}`);
                }
              }
            );
          }
        }
      );
      break;
    case "cp":
      copyOrMoveFile(args[0], args[1], false);
      break;
    case "mv":
      copyOrMoveFile(args[0], args[1], true);

      break;
    case "rm":
        fs.stat(args[0].startsWith(homeDir) ? args[0] : path.join(cwd(), args[0]), function (err) {
            if (err) {
                console.error(`Error: file is not exist`);
            } else {
              fs.unlink(args[0].startsWith(homeDir) ? args[0] : path.join(cwd(), args[0]), function (err) {
                if (err) {
                    console.error(`Error:  ${err.message}`);
                } else{
                    console.log(`File ${args[0]} was deleted succesfuly`);
                }
                
              });
            }
          });
      break;

    default:
      break;
  }
  function copyOrMoveFile(source, destination, move = false) {
    const sourceFile = source.startsWith(homeDir)
      ? source
      : path.join(cwd(), source);
    const destinationFile = path.isAbsolute(destination)
      ? path.join(destination, path.basename(sourceFile))
      : path.join(cwd(), destination, path.basename(sourceFile));

    fs.access(sourceFile, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`Error: file "${sourceFile}" not exist`);
        return;
      }

      const readableCopyStream = fs.createReadStream(sourceFile);
      const writableStream = fs.createWriteStream(destinationFile);

      readableCopyStream.pipe(writableStream);

      readableCopyStream.on("error", (err) => {
        console.error(`Error when readind: ${err.message}`);
      });

      writableStream.on("error", (err) => {
        console.error(`Error when loading: ${err.message}`);
      });

      writableStream.on("finish", () => {
        console.log(`File succesfully copied to ${destinationFile}`);
        if (move) {
          fs.unlink(sourceFile, (err) => {
            if (err) {
              console.error(
                `Error when deleting: ${err.message}`
              );
            } else {
              console.log(
                `File succesfully moved from ${sourceFile} to ${destinationFile}`
              );
            }
          });
        }
      });
    });
  }
};
