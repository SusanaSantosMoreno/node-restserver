const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    mail: {
        type: String,
        required: [true, 'mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//modificar la respuesta de la API
UserSchema.methods.toJSON = function () {
    const { __v, password, ...newUser } = this.toObject();
    return newUser;
}

module.exports = model('User', UserSchema);