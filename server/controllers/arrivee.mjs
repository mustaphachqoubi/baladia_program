import Arrivee from "../models/arrivee.mjs"
import mongoose from 'mongoose'

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
  const { number } = req.params 

  console.log("Deleting item with number:", number);
  console.log(req);
  
  const arrivee = await Arrivee.findOneAndDelete({ number: number })

  if(!arrivee){
    res.status(404).json({ error: "There is no arrivee with this number found" })
  }

  res.status(200).json(arrivee)
}
