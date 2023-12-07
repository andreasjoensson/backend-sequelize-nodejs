const db = require("../models"); // Import your Sequelize models
const Rental = db.Rental;

// Create and Save a new Rental
exports.create = (req, res) => {
  const { RentalDate, ReturnDate, CarID, CustomerID, LocationID } = req.body;

  // Validate request
  if (!Make || !Model || !Year || !RentalRate) {
    return res
      .status(400)
      .send({ message: "Required fields cannot be empty!" });
  }

  // Create a Rental
  Rental.create({
    RentalDate,
    ReturnDate,
    CarID,
    CustomerID,
    LocationID,
  })
    .then((Rental) => {
      res.send(Rental);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rental.",
      });
    });
};

// Retrieve all Rentals from the database
exports.findAll = (req, res) => {
  Rental.findAll()
    .then((Rentals) => {
      res.send(Rentals);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Rentals.",
      });
    });
};

// Find a single Rental by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rental.findByPk(id)
    .then((Rental) => {
      if (!Rental) {
        res.status(404).send({ message: `Rental with id ${id} not found.` });
      } else {
        res.send(Rental);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error retrieving Rental with id ${id}` });
    });
};

// Update a Rental by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Rental.update(req.body, {
    where: { RentalID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Rental was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Rental with id=${id}. Rental may not exist or request body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Error updating Rental with id ${id}` });
    });
};

// Delete a Rental by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Rental.destroy({
    where: { RentalID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Rental was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Rental with id=${id}. Rental may not exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Error deleting Rental with id ${id}` });
    });
};

// Delete all Rentals from the database
exports.deleteAll = (req, res) => {
  Rental.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Rentals were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while removing all Rentals.",
      });
    });
};

// Find all published Rentals
exports.findAllPublished = (req, res) => {
  Rental.findAll({ where: { published: true } })
    .then((Rentals) => {
      res.send(Rentals);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving published Rentals.",
      });
    });
};
