import { connectToDatabase } from "../../../services/db";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { username } = req.query;

    const client = await connectToDatabase();

    const db = client.db("info");
    const user = await db.collection("liked").findOne({ username });


    if (!user) {
      res.send({ message: "Not Found", ok: false });
      client.close();
      return;
    } 
    res.status(201).json({ message: "Saved", ok: true, data: user });
    client.close();
  }
}
