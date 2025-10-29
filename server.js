require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.static('./'));

app.get('/api/products', async (req, res) => {
  const keyword = req.query.keyword || 'home decor';
  const url = `https://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/${process.env.ALIEXPRESS_APP_KEY}?keywords=${encodeURIComponent(keyword)}&pageNo=1&pageSize=10&trackingId=${process.env.ALIEXPRESS_TRACKING_ID}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.result.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
