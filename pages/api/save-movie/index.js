import { connectToDatabase } from "../../../services/db"


export default async function handler(req, res) {
    if(req.method == 'POST') {
        const {username, movie } = JSON.parse(req.body)


        const client = await connectToDatabase()

        const db = client.db('info')
        const user = await db.collection('saved').findOne({username})

        if(!user) {
            await db.collection('saved').insertOne({username , movies:[movie]})
        } else {
            const index = user.movies.findIndex((el) => el.imdbID == movie.imdbID)
            if(!(index + 1)) {
                await db.collection('saved').updateOne({username}, {$set: {movies:[...user.movies , movie]} })
            } else {
                await db.collection('saved').updateOne({username}, {$set: {movies:[...user.movies.filter(el => el.imdbID != movie.imdbID)]} })
            } 
        }



        res.status(201).json({message:'Saved' , ok:true})
        client.close()
    } 
}