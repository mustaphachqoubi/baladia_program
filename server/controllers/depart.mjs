import Depart from "../models/depart.mjs";
import mongoose from 'mongoose'

// delay
export const checkNotifications = async (req, res) => {
    try {
        const allArrivee = await Arrivee.find({});

        const thresholdDays = 4;

        const delayedArrivee = allArrivee.filter(doc => checkDaysElapsed(doc, thresholdDays));

        res.status(200).json(delayedArrivee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function checkDaysElapsed(document, thresholdDays) {
    const createdAtDate = new Date(document.createdAt);
    const timeDifference = new Date() - createdAtDate;
    const secondsElapsed = Math.floor(timeDifference / 1000);

    return secondsElapsed >= thresholdDays;
}


//  get
export const getDepart = async (req, res) => {
    const depart = await Depart.find({}).sort({ createdAt: -1 })

    res.status(200).json(depart)
}

// post
export const createDepart = async (req, res) => {
  const { DepartTd } = req.body;

  try {
      const depart = await Depart.create({ DepartTd });
      res.status(200).json(depart);
  } catch (err) {
      res.status(400).json({ err: err.message });
  }
};

// delete
export const deleteDepart = async (req, res) => {
  const { id } = req.params 

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({ error: "id is not valid" })
  }  
  
  const depart = await Depart.findOneAndDelete({ _id: id })

  if(!depart){
    res.status(404).json({ error: "There is no depart with this id found" })
  }

  res.status(200).json(depart)
}
