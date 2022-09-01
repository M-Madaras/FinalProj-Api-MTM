import functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import { getGoals, setGoal, updateGoals, deleteGoal} from "./src/goals.js";

const app = express();// making are app express
app.use(cors()); // allowing our to use cors
app.use(express.json()); // setting express to .JSON format

// exporting our funtions to utilize firebase and to check with postman
app.get('/goals', getGoals);
app.post('/goals', setGoal);
app.patch('/goals', updateGoals);
app.delete('/goals', deleteGoal);

export const api = functions.https.onRequest(app);
