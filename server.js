const { createServer } = require('http');
const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const productRoutes = require('./src/routes/productRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

app.prepare().then(() => {
  const server = express();
  
  // Middleware to parse JSON bodies
  server.use(express.json());
  
  // API routes
  server.use('/api/products', productRoutes);
  server.use('/api/tasks', taskRoutes);
  
  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
