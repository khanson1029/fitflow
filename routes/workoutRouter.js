import { Router } from "express";
const router = Router();

import {
  getAllWorkouts,
  getWorkout,
  newWorkout,
  editWorkout,
  deleteWorkout,
  findWorkouts,
} from "../controllers/workoutController.js";

console.log(router.route);
router.route("/").get(getAllWorkouts).post(newWorkout);
router.route("/:id").get(getWorkout).patch(editWorkout).delete(deleteWorkout);
router.route("/search/:name").get(findWorkouts);

export default router;
