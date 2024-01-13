
import User from "../model/userModel.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const login = async (req, res) => {
    try {
        const { mobile, password } = req.body
        console.log('fd',req.body)
        const userFound = await User.findOne({ mobile })
        if (userFound) {
            const passwordMatch = await bcrypt.compare(password, userFound.password)
            if (passwordMatch) {
                return res.status(200).json('userFound')
            }
            else {
                return res.status(200).json('passwordError')
            }
        }
        else {
            const hashedPasswod = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                mobile,
                password: hashedPasswod
            })
            await newUser.save()
            return res.status(200).json('newUser')
        }
    } catch (error) {
        console.log(error)
    }
}


export const savePassword = async (req, res) => {
    try {
        const { key, password } = req.body

        const secretKey = 'your-secret-key';
        const algorithm = 'aes-256-cbc';

        const cipher = crypto.createCipher(algorithm, secretKey);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log(encrypted)

        


        const passwordSave = await User.updateOne({ mobile: '9847587401' }, { $push: { passwords: { key, password: encrypted } } })
        res.status(200).json('password saved')
    } catch (error) {
        console.log(error)
    }
}



export const getPasswords = async (req,res)=>{
    try {
        const passwords = await User.findOne({mobile:'9847587401'})
        console.log(passwords)
        const secretKey = 'your-secret-key';
        const algorithm = 'aes-256-cbc';
        const decryptedPasswords = passwords.passwords.map((password)=>{
            const decipher = crypto.createDecipher(algorithm, secretKey);
            let decrypted = decipher.update(password.password, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return { _id:password._id,key: password.key, password: decrypted };
        })
        console.log(decryptedPasswords)
        res.status(200).json(decryptedPasswords)
    } catch (error) {
        console.log(error)
    }
}


export const deletePassword = async(req,res)=>{
    try {
        const id = req.query.id
        console.log(id)
        const passwordDelete = await User.updateOne({mobile:'9847587401'},{$pull:{passwords:{_id:id}}})
        console.log(passwordDelete)
        res.status(200).json('passwordDeleted')
    } catch (error) {
        console.log(error)
    }
}
