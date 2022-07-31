import path from "path";
import { Airflow } from "./airflow";

async function exec() {
  // init
  console.log("Building Airflow API");
  const cwd = process.cwd();
  // TODO: add support for other folders
  const airflowFolder = path.join(cwd, "airflow");

  // Get current time
  const startTime = new Date();

  const airflow = new Airflow(airflowFolder, ["typescript"]);
  await airflow.build();

  // Done
  const stopTime = new Date();
  console.log(`Compiled in ${stopTime.getTime() - startTime.getTime()}ms`);
}

exec();
