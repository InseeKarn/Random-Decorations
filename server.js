require('dotenv').config();
const crypto = require('crypto');
const express = require('express');


const app = express();
const PORT = 3000;

app.use(express.static('./'));

const appKey = process.env.ALIEXPRESS_APP_KEY;
const appSecret = process.env.ALIEXPRESS_APP_SECRET;
console.log('App Key:', appKey);
console.log('App Secret:', appSecret);


const fallbackProducts = [
    {
        name: "Modern Wall Art Canvas",
        price: "$29.99",
        description: "Beautiful abstract wall art perfect for living room decoration",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500",
            "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500"
        ]
    },
    {
        name: "Ceramic Vase Set",
        price: "$24.50",
        description: "Elegant ceramic vases for flowers and home decoration",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500"
        ]
    },
    {
        name: "LED String Lights",
        price: "$15.99",
        description: "Warm white LED fairy lights for bedroom and party decoration",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1514897575457-c4db467cf78e?w=500",
            "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500"
        ]
    },
    {
        name: "Decorative Throw Pillows",
        price: "$18.75",
        description: "Soft cotton throw pillows with geometric patterns",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
            "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=500"
        ]
    },
    {
        name: "Macrame Wall Hanging",
        price: "$32.00",
        description: "Handmade macrame wall decoration in boho style",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500",
            "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500"
        ]
    },
    {
        name: "Artificial Plant Set",
        price: "$21.50",
        description: "Realistic artificial succulents and plants for desktop decor",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500",
            "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500"
        ]
    },
    {
        name: "Decorative Mirror",
        price: "$45.99",
        description: "Round gold frame mirror for wall decoration",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1618220924273-338d82d6a89d?w=500",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500"
        ]
    },
    {
        name: "Scented Candles Set",
        price: "$28.00",
        description: "Aromatherapy candles with lavender and vanilla scents",
        link: "https://www.aliexpress.com",
        images: [
            "https://images.unsplash.com/photo-1602874801006-e24b34a2b6c2?w=500",
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500"
        ]
    }
];


function generateSign(params, appSecret) {

  const sortedKeys = Object.keys(params).sort();
  let baseString = appSecret;
  for (const key of sortedKeys) {
    baseString += key + params[key];
  }
  baseString += appSecret;

  return crypto.createHash('md5').update(baseString).digest('hex').toUpperCase();
}

app.get('/api/products', async (req, res) => {
  const keyword = req.query.keyword || 'home decor';
  const appKey = process.env.ALIEXPRESS_APP_KEY;
  const appSecret = process.env.ALIEXPRESS_APP_SECRET;

  const params = {
    method: 'aliexpress.affiliate.product.query',
    app_key: appKey,
    timestamp: new Date().toISOString(),
    sign_method: 'md5',
    page_no: 1,
    page_size: 100,
    keywords: keyword
  };

  params.sign = generateSign(params, appSecret);

  try {
    const url = 'https://api-sg.aliexpress.com/sync';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams(params)
    });

    const data = await response.json();
    res.json(data.products || data.items || data.data || data);
  } catch (err) {
    console.error(err);
    res.json(fallbackProducts);
  }
});


app.get('/api/test', async (req, res) => {
    res.json({
        hasApiUrl: !!process.env.API_URL,
        hasApiKey: !!process.env.API_KEY,
        apiUrl: process.env.API_URL ? process.env.API_URL.replace(/key=[^&]+/g, 'key=***') : 'Not set',
        message: process.env.API_URL
            ? 'API URL is configured'
            : 'No API URL configured. Add API_URL to your .env file'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test API config: http://localhost:${PORT}/api/test`);
});