import mongoose from "mongoose"

const Schema = mongoose.Schema

const ArriveeTdSchema = new Schema({
    number: {type: Number, require: true}, 
    messageDate: {type: String, require: true},
    reciever: {type: String, require: true},
    subject: {type: String, require: true},
    answerdate: {type: String, require: true},
    status: {type: String, require: false},
    answered: { type: Boolean, default: false },
})

const arriveeSchema = new Schema({
    ArriveeTd: { type: [ArriveeTdSchema], require: true }
}, { timestamps: true })

export default mongoose.model("Arrivee", arriveeSchema)
