import { useState } from "react";
import { DEFAULT_PERIOD } from "../utils/constants";

const usePeriod = (initialPeriod = DEFAULT_PERIOD) => {
    const [period, setPeriod] = useState(initialPeriod);

    return {
        period,
        setPeriod,
    };
};

export default usePeriod;