import express from 'express';
import "reflect-metadata";
import charityRoutes from "./routes/charity"
import { AppDataSource } from './db/data-source';
import cors from 'cors';


const app = express();
AppDataSource.initialize();

const corsOption = {
  "origin": process.env.API_HOST
}
console.log(corsOption)

app.use(cors(corsOption));
app.use("/api/charities", charityRoutes)

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});