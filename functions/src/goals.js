import dbConnect from "./dbconnect.js";

export async function getGoals(req, res){ // getting the db info
    const db = dbConnect();
    const collection = await db.collection('goals').get()
    .catch(err => res.status(500).send(err));
    const goals = collection.docs.map(doc => {
        let goal = doc.data();
        goal.id = goal.id;
        return goal;
    })
    res.send(goals);
}

export async function setGoal(req, res) {// set goal function adding new goal
    const newGoal = req.body;
    if (!newGoal || !newGoal.goal) { // bad request error
        res.status(400).send({ success: false, message: 'Invalid request'});
        return;
    } 
    const db = dbConnect();
    await db.collection('goals').add(newGoal)
    .catch(err => res.status(500).send(err)); // eternal server error
    res.status(201);// created status code
    getGoals(req, res) // getting back full list of goal
}

export function updateGoals(req, res) {
    const goalsUpdate = req.body;
    const { goalId } = req.params;
    res.status(202).send('Goals Updated');
 }

 export function deleteGoal(req, res) {
    const { goalId } = req.params;
    res.status(203).send('Goal Deleted');
 }