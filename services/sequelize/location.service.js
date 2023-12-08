const db = require("../../models/sequelize"); // Import your Sequelize models
const Location = db.Location;

exports.createLocationSQ = async (LocationData) => {
  try {
    const newLocation = await Location.create(LocationData);
    return newLocation;
  } catch (error) {
    throw new Error(`Error creating Location: ${error.message}`);
  }
};

exports.getAllLocationsSQ = async () => {
  try {
    const allLocations = await Location.findAll();
    return allLocations;
  } catch (error) {
    throw new Error(`Error retrieving Locations: ${error.message}`);
  }
};

exports.findLocationSQ = async (id) => {
  try {
    const Location = await Location.findByPk(id);
    if (!Location) {
      throw new Error(`Location with id ${id} not found.`);
    }
    return Location;
  } catch (error) {
    throw new Error(
      `Error retrieving Location with id ${id}: ${error.message}`
    );
  }
};

exports.updateLocationSQ = async (id, LocationData) => {
  try {
    const [updatedCount] = await Location.update(LocationData, {
      where: { LocationID: id },
    });
    if (updatedCount === 1) {
      return { message: "Location was updated successfully." };
    }
    throw new Error(
      `Cannot update Location with id=${id}. Location may not exist or request body is empty!`
    );
  } catch (error) {
    throw new Error(`Error updating Location with id ${id}: ${error.message}`);
  }
};

exports.deleteLocationSQ = async (id) => {
  try {
    const deletedCount = await Location.destroy({
      where: { LocationID: id },
    });
    if (deletedCount === 1) {
      return { message: "Location was deleted successfully!" };
    }
    throw new Error(
      `Cannot delete Location with id=${id}. Location may not exist!`
    );
  } catch (error) {
    throw new Error(`Error deleting Location with id ${id}: ${error.message}`);
  }
};

exports.deleteAllLocationsSQ = async () => {
  try {
    const deletedCount = await Location.destroy({
      where: {},
      truncate: false,
    });
    return { message: `${deletedCount} Locations were deleted successfully!` };
  } catch (error) {
    throw new Error(
      `Error occurred while removing all Locations: ${error.message}`
    );
  }
};

exports.findAllPublishedLocationsSQ = async () => {
  try {
    const Locations = await Location.findAll({ where: { published: true } });
    return Locations;
  } catch (error) {
    throw new Error(`Error retrieving published Locations: ${error.message}`);
  }
};
