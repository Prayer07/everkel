import express from 'express';
import cors from 'cors';
import warehouseRoutes from './routes/warehouse.routes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://everkel.vercel.app/', // later you can lock it to your frontend URL
}))

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/warehouse', warehouseRoutes)