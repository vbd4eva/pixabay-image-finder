import PropTypes from "prop-types";

import { useMemo, useState } from "react";
import statusContext from "./context";
import statuses from "./statuses.json";

const { IDLE, PENDING, RESOLVED, REJECTED } = statuses;

function Provider({ children }) {
  const [status, setStatus] = useState(IDLE);

  const providerValue = useMemo(
    () => ({
      setStatus,
      checkStatus: (entryStatus) => entryStatus === status,
      IDLE,
      PENDING,
      RESOLVED,
      REJECTED,
    }),
    [status]
  );

  return (
    <statusContext.Provider value={providerValue}>
      {children}
    </statusContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node };

export default Provider;
