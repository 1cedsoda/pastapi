import path from "path";
import { Pastapi } from "./pastapi";

async function exec() {
  // init
  console.log("Building Pastapi API");
  const cwd = process.cwd();
  // TODO: add support for other folders
  const pastapiFolder = path.join(cwd, "pastapi");

  // Get current time
  const startTime = new Date();

  const pastapi = new Pastapi(pastapiFolder, ["typescript"]);
  await pastapi.build();

  // Done
  const stopTime = new Date();
  console.log(`Compiled in ${stopTime.getTime() - startTime.getTime()}ms`);
}

exec();
