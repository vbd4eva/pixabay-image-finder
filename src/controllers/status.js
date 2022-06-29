import { useState } from "react";
import statusList from "../json/statuses.json";

const { IDLE, PENDING, RESOLVED, REJECTED } = statusList;
export { IDLE, PENDING, RESOLVED, REJECTED };

let currentStatus = IDLE;

export function checkStatus(status) {
  return status === currentStatus;
}

export function StatusState() {
  const [status, setStatus] = useState(statusList.IDLE);

  const updateStatus = (status) => {
    currentStatus = status;
    setStatus(status);
  };

  //   return [status, updateStatus];
  return updateStatus;
}
