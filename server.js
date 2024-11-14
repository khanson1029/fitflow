//PACKAGES
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import Pool from "pg-pool";
import url from 'url';
//ROUTERS
import workoutRouter from "./routes/workoutRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ msg: "data received", data: req.body });
});

app.use("/api/v1/workouts", workoutRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong..." });
});

const port = process.env.PORT || 5100;

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(":");

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  ssl: true,
};

const pool = new Pool(config);

// const Ppool = pkg.Pool;
// const client = new Ppool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

try {
  await pool.connect().then((client) => {
    client.query("SELECT * FROM users WHERE name='Kyle Hanson'").then((res) => {
      client.release();
      console.log(res.rows);
    });
  });

  app.listen(port, () => {
    console.log(`Server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
