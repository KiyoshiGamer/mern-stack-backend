const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

// create a Schema function
const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
})

// this function will fire when someone call it
userSchema.statics.signup = async function(email, password)  {
    
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    } 

    // add extra characters to you password, for user who has similar password
    const salt = await bcrypt.genSalt(10)
    // encrypt a password you store in the database
    const hash = await bcrypt.hash(password, salt)
    // save the email and password to the database
    const user = await this.create({ email, password: hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)