import Arrivee from "../models/arrivee.mjs"
import mongoose from 'mongoose'

// delay
export const checkNotifications = async (req, res) => {
    try {
        const allArrivee = await Arrivee.find({});

        const thresholdSeconds = 10;

        const delayedArrivee = allArrivee.filter(doc => checkSecondsElapsed(doc, thresholdSeconds) && !doc.answered);

        res.status(200).json(delayedArrivee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function checkSecondsElapsed(document, thresholdSeconds) {
    const createdAtDate = new Date(document.createdAt);
    const timeDifference = new Date() - createdAtDate;
    const secondsElapsed = Math.floor(timeDifference / 1000);

    return secondsElapsed >= thresholdSeconds;
}

//get
export const getArrivee = async (req, res) => {
    const arrivee = await Arrivee.find({}).sort({ createdAt: -1})

    res.status(200).json(arrivee)
}

//post
export const createArrivee = async (req, res) => {
    const { ArriveeTd } = req.body
    try{
        const arrivee = await Arrivee.create({ ArriveeTd })
        res.status(200).json(arrivee)
    } catch (err){
        res.status(400).json({ err: err.message })
    }
}

// delete
export const deleteArrivee = async (req, res) => {
  const { id } = req.params 

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({ error: "id is not valid" })
  }
  
  const arrivee = await Arrivee.findOneAndDelete({ _id: id })

  if(!arrivee){
    res.status(404).json({ error: "There is no arrivee with this id found" })
  }

  res.status(200).json(arrivee)
}
