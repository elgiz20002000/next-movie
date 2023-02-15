import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { comparePassword } from "../../../services/crypt"
import { connectToDatabase } from "../../../services/db"
export const authoptions = {
    session:{
        jwt:true
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase()
                const collection  = client.db('auth').collection('users')
                const user = await collection.findOne({email:credentials.email})
                if(!user) {
                    client.close()
                    throw new Error('User isn"t authorized')
                }
                const isValid  = comparePassword(credentials.password , user.password)
                
                if(!isValid) {
                    client.close()
                    throw new Error('Password is not valid')
                }

                client.close()
                return {name : user.username}
            }
            ,
        })
    ]
}

export default NextAuth(authoptions)