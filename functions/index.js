import functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import { getGoals, setGoal, updateGoals, deleteGoal}
 from "./src/goals.js";
 import { createUser, loginUser } from "./src/users.js";


const app = express();// making are app express
app.use(cors({ origin: ["https://mtm-goals.web.app", "http://localhost:3000"]})); // allowing our to use cors
app.use(express.json()); // setting express to .JSON format

// exporting our funtions to utilize firebase and to check with postman
app.get('/goals', getGoals);
app.post('/goals', setGoal);
app.patch('/goals/update/:goalId', updateGoals);
app.delete('/goals/delete/:goalId', deleteGoal);


app.post('/users', createUser);
app.post('/users/login', loginUser);

// app.get('/test', (req, res) => res.send('TEST PASSED'));

export const api = functions.https.onRequest(app);
