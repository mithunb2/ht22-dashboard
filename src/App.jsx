import { useState, useEffect } from "react";

const mockData = {
  today: 412.35,
  history: [
    { date: "2025-04-23", profit: 240 },
    { date: "2025-04-24", profit: 320 },
    { date: "2025-04-25", profit: 190 },
    { date: "2025-04-26", profit: 410 },
    { date: "2025-04-27", profit: 360 },
    { date: "2025-04-28", profit: 270 },
    { date: "2025-04-29", profit: 390 },
  ],
};

export default function App() {
  const [tab, setTab] = useState("7days");
  const [todayProfit, setTodayProfit] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (tab === "7days") setData(mockData.history);
    if (tab === "realtime") setTodayProfit(mockData.today);
  }, [tab]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">HT 2.2 Profit Dashboard</h1>
      <div className="flex gap-2">
        <button onClick={() => setTab("7days")} className="px-4 py-2 rounded bg-blue-600 text-white">Last 7 Days</button>
        <button onClick={() => setTab("realtime")} className="px-4 py-2 rounded bg-gray-100">Real-Time (Today)</button>
        <button onClick={() => setTab("custom")} className="px-4 py-2 rounded bg-gray-100">Custom Range</button>
      </div>
      {tab === "7days" && (
        <ul>
          {data.map((day) => (
            <li key={day.date}>{day.date}: ${day.profit.toFixed(2)}</li>
          ))}
        </ul>
      )}
      {tab === "realtime" && (
        <div className="text-xl text-green-600 font-semibold">
          Today's Real-Time Profit: ${todayProfit?.toFixed(2)}
        </div>
      )}
      {tab === "custom" && (
        <div className="italic text-gray-500">
          Custom range coming soon...
        </div>
      )}
    </div>
  );
}
