import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function App() {
  const [tab, setTab] = useState("7days");
  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getROAS = (revenue, adSpend) => (adSpend ? (revenue / adSpend).toFixed(2) : "0.00");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("/api/sales");
        const data = res.data;

        const last7Days = data.history || [];
        const todayData = data.today || null;

        setToday(todayData);
        setHistory(last7Days);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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

      {loading && <p>Loading data...</p>}

      {!loading && tab === "7days" && history.length > 0 && (
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

      {!loading && tab === "realtime" && today && (
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

      {!loading && tab === "custom" && (
        <div className="italic text-gray-400 mt-6">Custom date picker coming soon...</div>
      )}
    </div>
  );
}
