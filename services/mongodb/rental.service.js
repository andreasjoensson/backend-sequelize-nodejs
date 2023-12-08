const Rental = require("../../models/mongodb/rental.model");
const mongoose = require("mongoose");

exports.createRentalMG = async (rentalData) => {
  try {
    const { CarID, CustomerID, LocationID, RentalDate, ReturnDate } =
      rentalData;

    // Convert string IDs to mongoose ObjectId
    const validCarID = new mongoose.Types.ObjectId(CarID);
    const validCustomerID = new mongoose.Types.ObjectId(CustomerID);
    const validLocationID = new mongoose.Types.ObjectId(LocationID);

    // Create a new Rental instance
    const newRental = new Rental({
      Car: validCarID,
      Customer: validCustomerID,
      Location: validLocationID,
      RentalDate: RentalDate,
      ReturnDate: ReturnDate,
    });

    // Save the new Rental
    const savedRental = await newRental.save();
    return savedRental;
  } catch (error) {
    throw new Error(`Error creating Rental: ${error.message}`);
  }
};

exports.getAllRentalsMG = async () => {
  try {
    const allRentals = await Rental.find()
      .populate("Car", "CarID") // Populating CarID from the Car collection
      .populate("Customer", "CustomerID"); // Populating CustomerID from the Customer collection
    return allRentals;
  } catch (error) {
    throw new Error(`Error retrieving Rentals: ${error.message}`);
  }
};

exports.findRentalMG = async (id) => {
  try {
    const rental = await Rental.findById(id)
      .populate("Car", "CarID") // Populating CarID from the Car collection
      .populate("Customer", "CustomerID"); // Populating CustomerID from the Customer collection
    if (!rental) {
      throw new Error(`Rental with id ${id} not found.`);
    }
    return rental;
  } catch (error) {
    throw new Error(`Error retrieving Rental with id ${id}: ${error.message}`);
  }
};

exports.updateRentalMG = async (id, rentalData) => {
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

exports.deleteRentalMG = async (id) => {
  try {
    console.log("id", id);
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

exports.deleteAllRentalsMG = async () => {
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

exports.findAllPublishedRentalsMG = async () => {
  try {
    const rentals = await Rental.find({ published: true });
    return rentals;
  } catch (error) {
    throw new Error(`Error retrieving published Rentals: ${error.message}`);
  }
};
