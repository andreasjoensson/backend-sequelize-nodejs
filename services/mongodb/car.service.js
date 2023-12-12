const Car = require("../../models/mongodb/cars.model");
const MaintenanceRecord = require("../../models/mongodb/maintenancerecord");
const InsurancePolicy = require("../../models/mongodb/insurancepolicy");
const Accessory = require("../../models/mongodb/accessory.model");
const TrafficViolation = require("../../models/mongodb/trafficviolation");

exports.createCarMG = async (carData) => {
  try {
    // Destructure with the keys matching the request's case
    const { Accessories, InsurancePolicy: insurancePolicyData, MaintenanceRecords, TrafficViolations, ...carInfo } = carData;

    // Create the car
    const newCar = await Car.create(carInfo);

    // Create associated documents
    if (Accessories) {
      await Promise.all(Accessories.map(acc => Accessory.create({ ...acc, CarID: newCar._id })));
    }

    if (insurancePolicyData) {
      await InsurancePolicy.create({ ...insurancePolicyData, CarID: newCar._id });
    }

    if (MaintenanceRecords) {
      await Promise.all(MaintenanceRecords.map(record => MaintenanceRecord.create({ ...record, CarID: newCar._id })));
    }

    if (TrafficViolations) {
      await Promise.all(TrafficViolations.map(violation => TrafficViolation.create({ ...violation, CarID: newCar._id })));
    }

    return newCar;
  } catch (error) {
    throw new Error(`Error creating car: ${error.message}`);
  }
};

exports.getAllCarsMG = async () => {
  try {
    const allCars = await Car.find();
    console.log("allCars", allCars);
    return allCars;
  } catch (error) {
    throw new Error(`Error retrieving cars: ${error.message}`);
  }
};

exports.findCarMG = async (id) => {
  try {
    const car = await Car.findById(id);
    if (!car) {
      throw new Error(`Car with id ${id} not found.`);
    }
    return car;
  } catch (error) {
    throw new Error(`Error retrieving car with id ${id}: ${error.message}`);
  }
};

exports.updateCarMG = async (id, carData) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, carData, { new: true });
    if (!updatedCar) {
      throw new Error(
        `Cannot update Car with id=${id}. Car may not exist or request body is empty!`
      );
    }
    return { message: "Car was updated successfully." };
  } catch (error) {
    throw new Error(`Error updating Car with id ${id}: ${error.message}`);
  }
};

exports.deleteCarMG = async (id) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      throw new Error(`Cannot delete Car with id=${id}. Car may not exist!`);
    }
    return { message: "Car was deleted successfully!" };
  } catch (error) {
    throw new Error(`Error deleting Car with id ${id}: ${error.message}`);
  }
};

exports.deleteAllCarsMG = async () => {
  try {
    const deletedCount = await Car.deleteMany({});
    return {
      message: `${deletedCount.deletedCount} Cars were deleted successfully!`,
    };
  } catch (error) {
    throw new Error(`Error occurred while removing all cars: ${error.message}`);
  }
};

exports.findAllPublishedCarsMG = async () => {
  try {
    const cars = await Car.find({ published: true });
    return cars;
  } catch (error) {
    throw new Error(`Error retrieving published cars: ${error.message}`);
  }
};
