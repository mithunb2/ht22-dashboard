// netlify/functions/sales.js
const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    // You'll replace these with real API calls
    const data = {
      today: {
        profit: 2180,
        adSpend: 530,
        revenue: 3530
      },
      history: [
        { date: "2025-04-23", profit: 240, adSpend: 70, revenue: 480 },
        { date: "2025-04-24", profit: 320, adSpend: 85, revenue: 530 },
        { date: "2025-04-25", profit: 190, adSpend: 60, revenue: 360 },
        { date: "2025-04-26", profit: 410, adSpend: 90, revenue: 600 },
        { date: "2025-04-27", profit: 360, adSpend: 75, revenue: 520 },
        { date: "2025-04-28", profit: 270, adSpend: 62, revenue: 450 },
        { date: "2025-04-29", profit: 390, adSpend: 88, revenue: 590 },
      ]
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error fetching real data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" })
    };
  }
};
