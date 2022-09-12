
import dbConnect from "./dbConnect.js";


export async function createUser(req, res) {
  let { email, password } = req.body; // LOWERCASE!!
  email = email.toLowerCase();
  const db = dbConnect();
  const user = await db.collection('users').add({ email, password })
    .catch(err => res.status(500).send(err));

}

export async function loginUser(req, res) {
  let { email, password } = req.body; // LOWERCASE!!
  email = email.toLowerCase();
  const db = dbConnect();
  const collection = await db.collection('users')
    .where('email', '==', email)
    .where('password', '==', password)
    .get()
    .catch(err => res.status(500).send(err));
  const user = collection.docs.map(doc => {
    let thisUser = doc.data();
    thisUser.id = doc.id;
    return thisUser;
  })[0];

  res.send({ token });
}