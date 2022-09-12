
import dbConnect from './dbConnect.js';


export async function getGoals(req, res) {

    const db = dbConnect();
    const collection = await db.collection('goals')

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

    let newGoal = req.body;

    if (!newGoal || !newGoal.goal) { // bad request error
        res.status(400).send({ success: false, message: 'Invalid request' });
        return;
    }
    // newGoal.userId = user.id;
    const db = dbConnect();
    await db.collection('goals').add(newGoal)
        .catch(err => res.status(500).send(err)); // eternal server error
    res.status(201);// created status code
    getGoals(req, res) // getting back full list of goal
    // res.send(newGoal)
}

export async function updateGoals(req, res) {
    let goalUpdate = req.body;
    const { goalId } = req.params;
    const db = dbConnect();
    await db.collection('goals').doc(goalId).update(goalUpdate)
        .catch(err => res.status(500).send(err));
    res.status(202)

    getGoals(req, res);
}


export async function deleteGoal(req, res) {
    // let goalDelete = req.body;
    const { goalId } = req.params;
    const db = dbConnect();
    await db.collection('goals').doc(goalId).delete()
        .catch(err => res.status(500).send(err));
    res.status(204)

    getGoals(req, res);
}