const Rental = require("../../models/mongodb/rental.model");

exports.createRental = async (rentalData) => {
  try {
    const newRental = await Rental.create(rentalData);
    return newRental;
  } catch (error) {
    throw new Error(`Error creating Rental: ${error.message}`);
  }
};

exports.getAllRentals = async () => {
  try {
    const allRentals = await Rental.find();
    return allRentals;
  } catch (error) {
    throw new Error(`Error retrieving Rentals: ${error.message}`);
  }
};

exports.findRental = async (id) => {
  try {
    const rental = await Rental.findById(id);
    if (!rental) {
      throw new Error(`Rental with id ${id} not found.`);
    }
    return rental;
  } catch (error) {
    throw new Error(`Error retrieving Rental with id ${id}: ${error.message}`);
  }
};

exports.updateRental = async (id, rentalData) => {
  try {
    const updatedRental = await Rental.findByIdAndUpdate(id, rentalData, {
      new: true,
    });
    if (!updatedRental) {
      throw new Error(
        `Cannot update Rental with id=${id}. Rental may not exist or request body is empty!`
      );
    }
    return { message: "Rental was updated successfully." };
  } catch (error) {
    throw new Error(`Error updating Rental with id ${id}: ${error.message}`);
  }
};

exports.deleteRental = async (id) => {
  try {
    const deletedRental = await Rental.findByIdAndDelete(id);
    if (!deletedRental) {
      throw new Error(
        `Cannot delete Rental with id=${id}. Rental may not exist!`
      );
    }
    return { message: "Rental was deleted successfully!" };
  } catch (error) {
    throw new Error(`Error deleting Rental with id ${id}: ${error.message}`);
  }
};

exports.deleteAllRentals = async () => {
  try {
    const deletedCount = await Rental.deleteMany({});
    return {
      message: `${deletedCount.deletedCount} Rentals were deleted successfully!`,
    };
  } catch (error) {
    throw new Error(
      `Error occurred while removing all Rentals: ${error.message}`
    );
  }
};

exports.findAllPublishedRentals = async () => {
  try {
    const rentals = await Rental.find({ published: true });
    return rentals;
  } catch (error) {
    throw new Error(`Error retrieving published Rentals: ${error.message}`);
  }
};
