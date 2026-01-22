import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import warehouseRoutes from './routes/warehouse.route.js'
import authRoutes from './routes/auth.route.js'
import dashboardRoutes from "./routes/dashboard.route.js"
import storeRoutes from "./routes/store.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",          // local frontend (Vite)
  "https://everkel.vercel.app"      // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/auth', authRoutes)
app.use('/warehouse', warehouseRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/store", storeRoutes)