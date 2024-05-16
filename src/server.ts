import "express-async-errors";
import express from "express";
import cors from 'cors';
import { router } from "./routes/routes";
import { errorMiddleware } from "./middlewares/Error";


const PORT = 3333

const app = express();

app.use(cors())
app.use(express.json())

app.use(router)
app.use(errorMiddleware)


app.listen(PORT, () => {
  console.log("Server is running on port 3333");
})