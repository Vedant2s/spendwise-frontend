import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";
import { formatShortDate } from "../../utils/date";

const normalizeTrendData = (data) => {
    const list = Array.isArray(data) ? data : data?.points || data?.trend || [];

    return list.map((point) => {
        const rawDate = point.date ?? point.label ?? point.period ?? point.timestamp;
        const formatted = formatShortDate(rawDate);

        return {
            label: formatted !== "—" ? formatted : String(rawDate ?? ""),
            balance: Number(
                point.balance ?? point.actualBalance ?? point.amount ?? point.value ?? 0
            ),
        };
    });
};

const BalanceTrendChart = ({ data, loading, currency = "USD" }) => {
    const chartData = normalizeTrendData(data);

    return (
        <div className="card">
            <div className="card-title">Balance Trend</div>

            {loading ? (
                <Loader text="Loading chart..." />
            ) : chartData.length === 0 ? (
                <div className="empty-state">No trend data for this period.</div>
            ) : (
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 12, fill: "#64748b" }}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                width={65}
                            />
                            <Tooltip
                                formatter={(value) => [
                                    formatCurrency(value, currency),
                                    "Balance",
                                ]}
                            />
                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke="#2563eb"
                                strokeWidth={2.5}
                                fill="url(#balanceFill)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default BalanceTrendChart;