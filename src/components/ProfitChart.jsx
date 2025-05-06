import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", sales: 540, ad: 180 },
  { date: "Tue", sales: 620, ad: 210 },
  { date: "Wed", sales: 820, ad: 265 },
  { date: "Thu", sales: 540, ad: 200 },
  { date: "Fri", sales: 680, ad: 220 },
];

export default function ProfitChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Sales vs Ad Spend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={3} />
          <Line type="monotone" dataKey="ad" stroke="#60a5fa" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
