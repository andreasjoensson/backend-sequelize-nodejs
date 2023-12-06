const db = require("../models"); // Import your Sequelize models
const Car = db.Car;

// Create and Save a new Car
exports.create = (req, res) => {
  const { Make, Model, Year, RentalRate } = req.body;

  // Validate request
  if (!Make || !Model || !Year || !RentalRate) {
    return res
      .status(400)
      .send({ message: "Required fields cannot be empty!" });
  }

  // Create a Car
  Car.create({
    Make,
    Model,
    Year,
    RentalRate,
  })
    .then((car) => {
      res.send(car);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Car.",
      });
    });
};

// Retrieve all Cars from the database
exports.findAll = (req, res) => {
  Car.findAll()
    .then((cars) => {
      res.send(cars);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};

// Find a single Car by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Car.findByPk(id)
    .then((car) => {
      if (!car) {
        res.status(404).send({ message: `Car with id ${id} not found.` });
      } else {
        res.send(car);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Error retrieving car with id ${id}` });
    });
};

// Update a Car by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Car.update(req.body, {
    where: { CarID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Car was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Car may not exist or request body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Error updating Car with id ${id}` });
    });
};

// Delete a Car by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { CarID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Car was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Car may not exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Error deleting Car with id ${id}` });
    });
};

// Delete all Cars from the database
exports.deleteAll = (req, res) => {
  Car.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Cars were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while removing all cars.",
      });
    });
};

// Find all published Cars
exports.findAllPublished = (req, res) => {
  Car.findAll({ where: { published: true } })
    .then((cars) => {
      res.send(cars);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving published cars.",
      });
    });
};
