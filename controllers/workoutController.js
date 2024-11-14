import { nanoid } from "nanoid";
import createWorkout from "../models/WorkoutModel.js";
let workouts = [
  {
    id: nanoid(),
    name: "Squat/Pull/Push/Curl",
    exercises: {
      squat: { sets: [{ reps: 60 }, { reps: 55 }, { reps: 50 }] },
      pullup: { sets: [{ reps: 15 }, { reps: 14 }, { reps: 13 }] },
      pushup: { sets: [{ reps: 30 }, { reps: 30 }, { reps: 30 }] },
      nordicCurl: { sets: [{ reps: 8 }, { reps: 8 }, { reps: 8 }] },
    },
  },
  {
    id: nanoid(),
    name: "Squat/Row/Push/Curl",
    exercises: {
      squat: { sets: [{ reps: 60 }, { reps: 60 }, { reps: 60 }] },
      rows: { sets: [{ reps: 20 }, { reps: 19 }, { reps: 18 }] },
      diamondPushup: { sets: [{ reps: 30 }, { reps: 30 }, { reps: 30 }] },
      nordicCurl: { sets: [{ reps: 8 }, { reps: 8 }, { reps: 8 }] },
    },
  },
];

//GET ALL WORKOUTS
export const getAllWorkouts = async (req, res) => {
  res.status(200).json({ workouts });
};

//GET SINGLE WORKOUT BY ID
export const getWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = workouts.find((workout) => workout.id === id);
  if (!workout) {
    return res.status(404).json({ msg: `no workout with id ${id}` });
  }
  res.status(200).json({ workout });
};

//GET WORKOUTS BASED THAT MATCH NAME
export const findWorkouts = async (req, res) => {
  const { name } = req.params;
  const workout = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(name.toLowerCase())
  );
  if (!workout) {
    return res
      .status(404)
      .json({ msg: `no workouts found containing name ${name}` });
  }
  res.status(200).json({ workout });
};

//CREATE WORKOUT
export const newWorkout = async (req, res) => {
  const { name, time, notes, userid } = req.body;
  const workout = await createWorkout(userid, name, time, notes);
  console.log(workout);

  res.status(200).json({ workout });
};

//EDIT WORKOUT
export const editWorkout = async (req, res) => {
  const { name, exercises } = req.body;

  if (!name || !exercises) {
    res.status(400).json({ msg: "please provide name and excersises" });
    return;
  }
  const { id } = req.params;
  const workout = workouts.find((workout) => workout.id === id);
  if (!workout) {
    return res.status(404).json({ msg: `no workout with id ${id}` });
  }
  workout.name = name;
  workout.exercises = exercises;

  res.status(200).json({ workout });
};

//DELETE WORKOUT
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = workouts.find((workout) => workout.id === id);
  if (!workout) {
    return res.status(404).json({ msg: `no workout with id ${id}` });
  }
  const newWorkouts = workouts.filter((workout) => workout.id !== id);
  workouts = newWorkouts;

  res.status(200).json({ msg: "workout deleted" });
};
