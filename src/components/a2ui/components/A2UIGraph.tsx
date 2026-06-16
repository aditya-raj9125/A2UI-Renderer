/**
 * @file A2UIGraph.tsx
 * @description Data visualization component displaying bar, line or pie charts using Recharts.
 */

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { A2UIGraphComponent } from "../types/a2ui.types";

interface A2UIGraphProps {
  component: A2UIGraphComponent;
}

// Colors for Pie chart pieces
const PIE_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

/**
 * Graph component displaying interactive data visualizations.
 */
export const A2UIGraph: React.FC<A2UIGraphProps> = ({ component }) => {
  const { chartType, title, data, color } = component;

  const chartColor = color || "var(--color-accent)";

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="label"
              stroke="var(--color-text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "var(--color-text-primary)",
              }}
            />
            <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case "line":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="label"
              stroke="var(--color-text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "var(--color-text-primary)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
              nameKey="label"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "var(--color-text-primary)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px", color: "var(--color-text-primary)" }}
            />
          </PieChart>
        );

      default:
        return <div className="text-sm text-red-500">Unsupported chart type</div>;
    }
  };

  return (
    <div className="w-full bg-surface/50 border border-border/80 rounded-2xl p-4 font-sans shadow-sm select-none">
      {title && (
        <h4 className="text-sm font-semibold text-textPrimary mb-3.5 tracking-tight">
          {title}
        </h4>
      )}
      <div className="w-full h-[180px] md:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default A2UIGraph;
