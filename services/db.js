
import { MongoClient } from "mongodb"
import { hashPassword } from "./crypt"

export const connectToDatabase = async () => {
    const client = new  MongoClient('mongodb+srv://Elgiz:C3WZMh1Ugpuhdqlg@cluster1.db3ynra.mongodb.net/retryWrites=true&w=majority')
    await client.connect()
    return client
}

export const createUser = async ({email , password , name}) => {
    const client = await connectToDatabase()
    const collection = client.db().collection('users')
    const hashedPassword = hashPassword(password)
    await collection.insertOne({email , password: hashedPassword , name})
}


export const getSavedMovies = async (username) => {
    const client = await connectToDatabase()
    const collection = client.db('info').collection('saved')
    return collection.findOne({username})
}