import { Worker } from "worker_threads";
import path from "path";
import os from "os";

const performCalculations = async () => {
  const workerDir = path.resolve("src", "wt");
  const workerPath = path.join(workerDir, "worker.js");
  const numCPUs = os.cpus().length;
  let calls = 0;
  const workers = [];

  const update = () => {
    calls++;
    if (calls === numCPUs) {
      console.log(workers);
    }
  };

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(workerPath, {
      workerData: i + 10,
    });

    worker.on("message", (data) => {
      workers[i] = {
        status: "resolved",
        data,
      };
      update();
    });

    worker.on("error", () => {
      workers[i] = {
        status: "error",
        data: null,
      };
      update();
    });
  }
};

await performCalculations();
