
import React from "react";

export default function MetricsCard() {
  const metrics = {
    revenue: 1980,
    adSpend: 655,
    roas: 3.02,
    cpp: 7.28,
    profit: 1325,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {Object.entries(metrics).map(([label, value]) => (
        <div key={label} className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm font-medium text-gray-600 capitalize">{label}</p>
          <p className="text-xl font-bold text-gray-800">
            {label === "roas" || label === "cpp"
              ? value.toFixed(2)
              : `$${value.toLocaleString()}`}
          </p>
        </div>
      ))}
    </div>
  );
}
