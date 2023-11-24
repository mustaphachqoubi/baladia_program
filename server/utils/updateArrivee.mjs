

export const updateArrivee = async () => {
  try {
    const result = await Arrivee.updateMany({}, { $set: { answered: false } });
    console.log('Update result:', result);
    console.log('Arrivee documents updated successfully.');
  } catch (error) {
    console.error('Error updating arrivee documents:', error.message);
  }
};

