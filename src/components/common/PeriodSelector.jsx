import { PERIOD_OPTIONS } from "../../utils/constants";

const PeriodSelector = ({ value, onChange, options = PERIOD_OPTIONS }) => {
    return (
        <div className="period-selector" role="group" aria-label="Select period">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={`period-btn ${
                        value === option.value ? "active" : ""
                    }`.trim()}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default PeriodSelector;