const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    firstName:{
        type: String,
        default: ''
    },
    lastName:{
        type: String,
        default: ''
    },
    authStrategy:{
        type: String,
        default: 'local'
    },
    refreshToken:{
        type: [Session]
    },
    points:{
        type: Number,
        default: 50
    },
    

})

const Session = new Schema({
    refreshToken:{
        type: String,
        default:''
    }
})


//remove refresh
User.set('toJSON',{
    transform: function(doc, ret, options){
        delete ret.refreshToken
        return ret
    }
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)