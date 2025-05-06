// netlify/functions/sales.js
const axios = require("axios");

const SHOP_DOMAIN = "ehs7st-za.myshopify.com";
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const FACEBOOK_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_AD_ACCOUNTS = [
  "act_1335431530982670", // HT 2.2
  "act_381996874977190", // DCSFERF
];

exports.handler = async function (event, context) {
  try {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 7);

    const since = pastDate.toISOString();
    const until = today.toISOString();

    // === 1. Fetch Shopify Orders ===
    const shopifyResponse = await axios.get(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/orders.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_TOKEN,
        },
        params: {
          status: "any",
          created_at_min: since,
          created_at_max: until,
          fields: "created_at,total_price",
          limit: 250,
        },
      }
    );

    const orders = shopifyResponse.data.orders || [];
    const revenueByDate = {};

    for (let order of orders) {
      const date = order.created_at.split("T")[0];
      const total = parseFloat(order.total_price);
      revenueByDate[date] = (revenueByDate[date] || 0) + total;
    }

    // === 2. Fetch Facebook Ad Spend ===
    const spendByDate = {};

    for (let accountId of FACEBOOK_AD_ACCOUNTS) {
      const url = `https://graph.facebook.com/v19.0/${accountId}/insights`;

      const fbResponse = await axios.get(url, {
        params: {
          access_token: FACEBOOK_TOKEN,
          time_range: JSON.stringify({ since: since.split("T")[0], until: until.split("T")[0] }),
          time_increment: 1,
          fields: "spend,date_start",
        },
      });

      const spendData = fbResponse.data.data || [];

      for (let entry of spendData) {
        const date = entry.date_start;
        const spend = parseFloat(entry.spend || 0);
        spendByDate[date] = (spendByDate[date] || 0) + spend;
      }
    }

    // === 3. Combine Profit Data ===
    const history = Object.keys(revenueByDate).map((date) => {
      const revenue = revenueByDate[date] || 0;
      const adSpend = spendByDate[date] || 0;
      const profit = revenue - adSpend;
      return { date, revenue, adSpend, profit };
    });

    const todayDate = today.toISOString().split("T")[0];
    const todayData = history.find((h) => h.date === todayDate) || null;

    return {
      statusCode: 200,
      body: JSON.stringify({ today: todayData, history }),
    };
  } catch (error) {
    console.error("Data Fetch Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
