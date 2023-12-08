const Location = require("../../models/mongodb/location.model"); // Import your Mongoose Location model

exports.createLocationMG = async (locationData) => {
  try {
    const newLocation = await Location.create(locationData);
    return newLocation;
  } catch (error) {
    throw new Error(`Error creating location: ${error.message}`);
  }
};

exports.getAllLocationsMG = async () => {
  try {
    const allLocations = await Location.find();
    return allLocations;
  } catch (error) {
    throw new Error(`Error retrieving locations: ${error.message}`);
  }
};

exports.findLocationMG = async (id) => {
  try {
    const location = await Location.findById(id);
    if (!location) {
      throw new Error(`Location with id ${id} not found.`);
    }
    return location;
  } catch (error) {
    throw new Error(
      `Error retrieving location with id ${id}: ${error.message}`
    );
  }
};

exports.updateLocationMG = async (id, locationData) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(id, locationData, {
      new: true,
    });
    if (!updatedLocation) {
      throw new Error(
        `Cannot update Location with id=${id}. Location may not exist or request body is empty!`
      );
    }
    return { message: "Location was updated successfully." };
  } catch (error) {
    throw new Error(`Error updating Location with id ${id}: ${error.message}`);
  }
};

exports.deleteLocationMG = async (id) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      throw new Error(
        `Cannot delete Location with id=${id}. Location may not exist!`
      );
    }
    return { message: "Location was deleted successfully!" };
  } catch (error) {
    throw new Error(`Error deleting Location with id ${id}: ${error.message}`);
  }
};

exports.deleteAllLocationsMG = async () => {
  try {
    const deletedCount = await Location.deleteMany({});
    return {
      message: `${deletedCount.deletedCount} Locations were deleted successfully!`,
    };
  } catch (error) {
    throw new Error(
      `Error occurred while removing all locations: ${error.message}`
    );
  }
};

exports.findAllPublishedLocationsMG = async () => {
  try {
    const locations = await Location.find({ published: true });
    return locations;
  } catch (error) {
    throw new Error(`Error retrieving published locations: ${error.message}`);
  }
};
