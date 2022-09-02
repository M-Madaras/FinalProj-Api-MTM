import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect.js';
import { secretKey } from '../credentials.js';

export async function getGoals(req, res){ 
    // const token = req.headers.authorization;
    // const user = jwt.verify(token, secretKey);
    const db = dbConnect();
    const collection = await db.collection('goals')
    // .where('userId', '==', user.id)
    .get()
    .catch(err => res.status(500).send(err));
    const goals = collection.docs.map(doc => {
        let goal = doc.data();
        goal.id = goal.id;
        return goal;
    }
    )
    res.send(goals);
}

export async function setGoal(req, res) {// set goal function adding new goal
    // const token = req.headers.authorization;
    let newGoal = req.body;
    // const user = jwt.verify(token, secretKey);
    if (!newGoal || !newGoal.goal ) { // bad request error
        res.status(400).send({ success: false, message: 'Invalid request'});
        return;
    } 
    // newTask.userId = user.id;
    const db = dbConnect();
    await db.collection('goals').add(newGoal)
    .catch(err => res.status(500).send(err)); // eternal server error
    res.status(201);// created status code
    getGoals(req, res) // getting back full list of goal
    // res.send(newGoal)
}

export async function updateGoals(req, res) {
    const goalUpdate = req.body;
    const { goalId } = req.params;
    res.status(202).send('Goals Updated');
    await db.collection('tasks').doc(goalId).update(goalUpdate)
    .catch(err => res.status(500).send(err));
  res.status(202);
  getTasks(req, res);
}
 
 export function deleteGoal(req, res) {
    const { goalId } = req.params;
    res.status(203).send('Goal Deleted');
 }