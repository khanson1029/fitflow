import * as dotenv from "dotenv";
dotenv.config();
import Pool from "pg-pool";
import url from "url";

// Initialize the PostgreSQL connection pool
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

// Functions for interacting with the workouts database

// Create a workout
async function createWorkout(userId, name, totalTime, notes) {
  var client = await pool.connect();
  try {
    var result = await client.query(
      `INSERT INTO workouts (user_id, name, total_time, notes, date) VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [userId, name, totalTime, notes]
    );
    return result.rows[0];
  } catch (e) {
    console.error(e.message, e.stack);
  } finally {
    client.release();
  }
}

// Get a workout by ID
async function getWorkoutById(workoutId) {
  const result = await pool.query(`SELECT * FROM workouts WHERE id = $1`, [
    workoutId,
  ]);
  return result.rows[0];
}

// Get all workouts for a user
async function getWorkoutsByUser(userId) {
  const result = await pool.query(
    `SELECT * FROM workouts WHERE user_id = $1 ORDER BY date DESC`,
    [userId]
  );
  return result.rows;
}

// Add an exercise set to a workout
async function addExerciseToWorkout(workoutId, exerciseId, reps, weight) {
  const result = await pool.query(
    `INSERT INTO sets (workout_id, exercise_id, reps, weight) VALUES ($1, $2, $3, $4) RETURNING *`,
    [workoutId, exerciseId, reps, weight]
  );
  return result.rows[0];
}

// Close the database connection pool when done
function closePool() {
  return pool.end();
}

export default createWorkout;
