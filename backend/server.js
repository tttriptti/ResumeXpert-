// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';  // ← use named import here
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';







const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//const PORT = 4000;

// Middleware to handle CORS
//app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173', 'https://rresumexpert.netlify.app'],
  credentials: true
}));

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Server uploads folder
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, _path) => {
      res.set('Access-Control-Allow-Origin', 'http://localhost:5173','https://rresumexpert.netlify.app');
    },
  })
);

// ✅ API Root Route
app.get('/', (req, res) => {
  res.send('API WORKING');
});
app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
})



// Start Server
/*app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});*/
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ Always export for Vercel
export default app;
