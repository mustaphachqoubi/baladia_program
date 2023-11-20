import Depart from "../models/depart.mjs";
import mongoose from 'mongoose'

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
  const { number } = req.params

  
  const depart = await Depart.deleteMany({ number: number })


  if(!depart){
    res.status(404).json({ error: "There is no depart with this number found" })
  }

  res.status(200).json(depart)
}
