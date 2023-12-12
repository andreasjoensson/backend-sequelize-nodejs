const db = require("../../models/sequelize"); // Import your Sequelize models
const Car = db.Car;
const MaintenanceRecords = db.MaintenanceRecord;
const InsurancePolicies = db.InsurancePolicy;
const Accessories = db.Accessory;
const TrafficViolations = db.TrafficViolation;


exports.createCarSQ = async (carData) => {
  const { 
    Accessories: accessoriesData, 
    InsurancePolicy: insurancePolicyData,
    MaintenanceRecords: maintenanceRecordsData, 
    TrafficViolations: trafficViolationsData,
    ...carInfo 
  } = carData;

  try {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    // Create the car
    const newCar = await Car.create(carInfo, { transaction });

    // Create associated records
    if (accessoriesData && accessoriesData.length) {
      await Promise.all(
        accessoriesData.map(accessory =>
          Accessories.create({ ...accessory, CarID: newCar.CarID }, { transaction })
        )
      );
    }

    if (insurancePolicyData) {
      await InsurancePolicies.create({ ...insurancePolicyData, CarID: newCar.CarID }, { transaction });
    }

    if (maintenanceRecordsData && maintenanceRecordsData.length) {
      await Promise.all(
        maintenanceRecordsData.map(record =>
          MaintenanceRecords.create({ ...record, CarID: newCar.CarID }, { transaction })
        )
      );
    }

    if (trafficViolationsData && trafficViolationsData.length) {
      await Promise.all(
        trafficViolationsData.map(violation =>
          TrafficViolations.create({ ...violation, CarID: newCar.CarID }, { transaction })
        )
      );
    }

    // Commit the transaction
    await transaction.commit();

    return newCar;
  } catch (error) {
    // Rollback the transaction in case of error
    console.log('error', error)
    await transaction.rollback();
    throw new Error(`Error creating car with associated records: ${error.message}`);
  }
};

exports.getAllCarsSQ = async () => {
  try {
    const allCars = await Car.findAll();
    return allCars;
  } catch (error) {
    throw new Error(`Error retrieving cars: ${error.message}`);
  }
};

exports.findCarSQ = async (id) => {
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      throw new Error(`Car with id ${id} not found.`);
    }
    return car;
  } catch (error) {
    throw new Error(`Error retrieving car with id ${id}: ${error.message}`);
  }
};

exports.updateCarSQ = async (id, carData) => {
  try {
    const [updatedCount] = await Car.update(carData, {
      where: { CarID: id },
    });
    if (updatedCount === 1) {
      return { message: "Car was updated successfully." };
    }
    throw new Error(
      `Cannot update Car with id=${id}. Car may not exist or request body is empty!`
    );
  } catch (error) {
    throw new Error(`Error updating Car with id ${id}: ${error.message}`);
  }
};

exports.deleteCarSQ = async (id) => {
  try {
    const deletedCount = await Car.destroy({
      where: { CarID: id },
    });
    if (deletedCount === 1) {
      return { message: "Car was deleted successfully!" };
    }
    throw new Error(`Cannot delete Car with id=${id}. Car may not exist!`);
  } catch (error) {
    throw new Error(`Error deleting Car with id ${id}: ${error.message}`);
  }
};

exports.deleteAllCarsSQ = async () => {
  try {
    const deletedCount = await Car.destroy({
      where: {},
      truncate: false,
    });
    return { message: `${deletedCount} Cars were deleted successfully!` };
  } catch (error) {
    throw new Error(`Error occurred while removing all cars: ${error.message}`);
  }
};

exports.findAllPublishedCarsSQ = async () => {
  try {
    const cars = await Car.findAll({ where: { published: true } });
    return cars;
  } catch (error) {
    throw new Error(`Error retrieving published cars: ${error.message}`);
  }
};
