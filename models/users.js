// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // ensures no duplicate usernames
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // creates a unique index
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password - in the pre save event
// run as regular function as arrow break 'this' when using arrow function
// must use regular function.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password hasn't changed

    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (err) {
        next(err);
    }

})

userSchema.methods.comparePassword = async function (uPassword) {
    console.log('UPassword', uPassword)
    return await bcrypt.compare(uPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;