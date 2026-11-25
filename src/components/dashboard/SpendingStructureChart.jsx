import {
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";

const CHART_COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#64748b",
];

const normalizeSpendingData = (data) => {
    const list = Array.isArray(data)
        ? data
        : data?.categories || data?.items || [];

    return list
        .map((item, index) => ({
            name: item.category || item.categoryName || item.name || "Other",
            value: Math.abs(
                Number(item.amount ?? item.total ?? item.spent ?? item.value ?? 0)
            ),
            fill: CHART_COLORS[index % CHART_COLORS.length],
        }))
        .filter((item) => item.value > 0);
};

const SpendingStructureChart = ({ data, loading, currency = "USD" }) => {
    const chartData = normalizeSpendingData(data);

    return (
        <div className="card">
            <div className="card-title">Spending Structure</div>

            {loading ? (
                <Loader text="Loading chart..." />
            ) : chartData.length === 0 ? (
                <div className="empty-state">No spending data for this period.</div>
            ) : (
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={2}
                            />
                            <Tooltip
                                formatter={(value) => formatCurrency(value, currency)}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default SpendingStructureChart;