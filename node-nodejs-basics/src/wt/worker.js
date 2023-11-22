import { workerData, parentPort } from "worker_threads";

const nthFibonacci = (n) => {
  return n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

const sendResult = () => {
  const res = nthFibonacci(workerData);
  parentPort.postMessage(res);
};

sendResult();