const db = require("../../models/sequelize"); // Import your Sequelize models
const Rental = db.Rental;

exports.createRentalSQ = async (RentalData) => {
  try {
    const newRental = await Rental.create(RentalData);
    return newRental;
  } catch (error) {
    throw new Error(`Error creating Rental: ${error.message}`);
  }
};

exports.getAllRentalsSQ = async () => {
  try {
    const allRentals = await Rental.findAll();
    return allRentals;
  } catch (error) {
    throw new Error(`Error retrieving Rentals: ${error.message}`);
  }
};

exports.findRentalSQ = async (id) => {
  try {
    const Rental = await Rental.findByPk(id);
    if (!Rental) {
      throw new Error(`Rental with id ${id} not found.`);
    }
    return Rental;
  } catch (error) {
    throw new Error(`Error retrieving Rental with id ${id}: ${error.message}`);
  }
};

exports.updateRentalSQ = async (id, RentalData) => {
  try {
    const [updatedCount] = await Rental.update(RentalData, {
      where: { RentalID: id },
    });
    if (updatedCount === 1) {
      return { message: "Rental was updated successfully." };
    }
    throw new Error(
      `Cannot update Rental with id=${id}. Rental may not exist or request body is empty!`
    );
  } catch (error) {
    throw new Error(`Error updating Rental with id ${id}: ${error.message}`);
  }
};

exports.deleteRentalSQ = async (id) => {
  try {
    const deletedCount = await Rental.destroy({
      where: { RentalID: id },
    });
    if (deletedCount === 1) {
      return { message: "Rental was deleted successfully!" };
    }
    throw new Error(
      `Cannot delete Rental with id=${id}. Rental may not exist!`
    );
  } catch (error) {
    throw new Error(`Error deleting Rental with id ${id}: ${error.message}`);
  }
};

exports.deleteAllRentalsSQ = async () => {
  try {
    const deletedCount = await Rental.destroy({
      where: {},
      truncate: false,
    });
    return { message: `${deletedCount} Rentals were deleted successfully!` };
  } catch (error) {
    throw new Error(
      `Error occurred while removing all Rentals: ${error.message}`
    );
  }
};

exports.findAllPublishedRentalsSQ = async () => {
  try {
    const Rentals = await Rental.findAll({ where: { published: true } });
    return Rentals;
  } catch (error) {
    throw new Error(`Error retrieving published Rentals: ${error.message}`);
  }
};
