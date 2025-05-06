import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const mockData = {
  today: {
    profit: 412.35,
    adSpend: 100,
    revenue: 620,
  },
  history: [
    { date: "2025-04-23", profit: 240, adSpend: 70, revenue: 480 },
    { date: "2025-04-24", profit: 320, adSpend: 85, revenue: 530 },
    { date: "2025-04-25", profit: 190, adSpend: 60, revenue: 360 },
    { date: "2025-04-26", profit: 410, adSpend: 90, revenue: 600 },
    { date: "2025-04-27", profit: 360, adSpend: 75, revenue: 520 },
    { date: "2025-04-28", profit: 270, adSpend: 62, revenue: 450 },
    { date: "2025-04-29", profit: 390, adSpend: 88, revenue: 590 },
  ],
};

export default function App() {
  const [tab, setTab] = useState("7days");
  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setToday(mockData.today);
    setHistory(mockData.history);
  }, []);

  const getROAS = (revenue, adSpend) => (adSpend ? (revenue / adSpend).toFixed(2) : "0.00");
  const getCPP = (revenue, adSpend) => (revenue ? (adSpend / revenue).toFixed(2) : "0.00");

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">💹 HT Profit Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => setTab("7days")} className={`px-4 py-2 rounded ${tab === "7days" ? "bg-blue-600 text-white" : "bg-white"}`}>
          Last 7 Days
        </button>
        <button onClick={() => setTab("realtime")} className={`px-4 py-2 rounded ${tab === "realtime" ? "bg-blue-600 text-white" : "bg-white"}`}>
          Real-Time
        </button>
        <button onClick={() => setTab("custom")} className={`px-4 py-2 rounded ${tab === "custom" ? "bg-blue-600 text-white" : "bg-white"}`}>
          Custom
        </button>
      </div>

      {/* 7 Day Chart */}
      {tab === "7days" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Total Revenue</h2>
              <p className="text-xl font-bold text-green-600">
                ${history.reduce((sum, d) => sum + d.revenue, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Total Ad Spend</h2>
              <p className="text-xl font-bold text-red-500">
                ${history.reduce((sum, d) => sum + d.adSpend, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">ROAS</h2>
              <p className="text-xl font-bold text-blue-600">
                {getROAS(
                  history.reduce((sum, d) => sum + d.revenue, 0),
                  history.reduce((sum, d) => sum + d.adSpend, 0)
                )}
              </p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Total Profit</h2>
              <p className="text-xl font-bold text-emerald-600">
                ${history.reduce((sum, d) => sum + d.profit, 0).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">💰 Profit Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#4ade80" strokeWidth={2} />
                <Line type="monotone" dataKey="adSpend" stroke="#f87171" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Real-time */}
      {tab === "realtime" && today && (
        <div className="bg-white p-6 rounded shadow mt-6 space-y-3">
          <h2 className="text-xl font-bold text-gray-700">Today's Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><span className="text-gray-500">Revenue</span><p className="text-green-600 font-bold text-xl">${today.revenue}</p></div>
            <div><span className="text-gray-500">Ad Spend</span><p className="text-red-500 font-bold text-xl">${today.adSpend}</p></div>
            <div><span className="text-gray-500">ROAS</span><p className="text-blue-600 font-bold text-xl">{getROAS(today.revenue, today.adSpend)}</p></div>
            <div><span className="text-gray-500">Profit</span><p className="text-emerald-600 font-bold text-xl">${today.profit}</p></div>
          </div>
        </div>
      )}

      {/* Coming soon */}
      {tab === "custom" && (
        <div className="italic text-gray-400 mt-6">Custom date picker coming soon...</div>
      )}
    </div>
  );
}
