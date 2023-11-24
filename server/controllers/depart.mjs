import Depart from "../models/depart.mjs";
import mongoose from 'mongoose'


// delay
export const checkNotifications = async (req, res) => {
  try {
    const allDepart = await Depart.find({});

    const thresholdSeconds = 10;
    const delayedDepart = allDepart.filter(
      (doc) => checkSecondsElapsed(doc, thresholdSeconds) && !doc.answered
    );

    // Send the response without documents with answered: true
    const filteredDelayedDepart = delayedDepart.map((doc) => ({
      ...doc.toObject(),
      DepartTd: doc.DepartTd.filter((td) => !td.answered),
    }));

    res.status(200).json(filteredDelayedDepart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function checkSecondsElapsed(document, thresholdSeconds) {
  const createdAtDate = new Date(document.createdAt);
  const timeDifference = new Date() - createdAtDate;
  const secondsElapsed = Math.floor(timeDifference / 1000);

  return !document.answered && secondsElapsed >= thresholdSeconds;
}

// Mark a document as answered
export const markAsAnswered = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "id is not valid" });
    }

    const updatedDocument = await Depart.findOneAndUpdate(
      { _id: id },
      { $set: { 'DepartTd.$[].answered': true } },
      { new: true }
    );

    if (!updatedDocument) {
      return res
        .status(404)
        .json({ error: "There is no depart with this id found" });
    }

    console.log("Document before update:", updatedDocument);

    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
