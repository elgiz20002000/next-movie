import { connectToDatabase } from "../../services/db"


export default async function handler(req, res) {
    if(req.method == 'POST') {
        const {username, like , movieID } = JSON.parse(req.body)

        const client = await connectToDatabase()

        const db = client.db('info')
        const user = await db.collection('liked').findOne({username})

        if(!user) {
            await db.collection('liked').insertOne({username , movies:[{movieID, like}]})
        } else {
            if(!like) {
                await db.collection('liked').updateOne({username}, {$set: {movies:[...user.movies , {movieID, like}]} })
            } else {
                await db.collection('liked').updateOne({username}, {$set: {movies:[...user.movies.filter(el => el.movieID != movieID)]} })
            } 
        }



        res.status(201).json({message:'Saved' , ok:true}) 
        client.close()
    } 
}