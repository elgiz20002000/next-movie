import { boolean } from "yup"
import { hashPassword } from "../../services/crypt"
import { connectToDatabase } from "../../services/db"



export default async function handler(req, res) {
    if(req.method == 'POST') {
        const {email , username , password} = req.body

        if(!email.includes('@') || !email || !password ||  password.trim().lenght < 8 || !username ) {
            res.status(422).json({message:'Invalid inputs value', ok:false})
            return
        }

        const client = await connectToDatabase()

        const db = client.db('auth')
        const isExists = await db.collection('users').findOne({email})

        if(isExists) {
            client.close()
            res.status(422).json({message:'User already exists' , ok:false})
            return
        }
        const hashedPassword = hashPassword(password)

        await db.collection('users').insertOne({email , password:hashedPassword , username})


        res.status(201).json({message:'User created' , ok:true})
        client.close()
    }
}