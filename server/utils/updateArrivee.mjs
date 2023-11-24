
// updateArrivee.mjs

import Arrivee from "../models/arrivee.mjs"; // Adjust the path based on your project structure
import mongoose from 'mongoose';

export const updateArrivee = async () => {
  try {
    // Update all arrivee documents to set answered to false
    await Arrivee.updateMany({}, { $set: { answered: false } });
    console.log('Arrivee documents updated successfully.');
  } catch (error) {
    console.error('Error updating arrivee documents:', error.message);
  }
};
