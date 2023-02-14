import bcrypt from 'bcryptjs'
export const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password)
    return hashedPassword
}

export const comparePassword = (currentPassword , databasePassword) => {
    const isEqual = bcrypt.compareSync(currentPassword , databasePassword)
    return isEqual
}