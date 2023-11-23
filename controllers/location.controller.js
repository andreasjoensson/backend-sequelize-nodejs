const db = require("../models"); // Import your Sequelize models

const Location = db.Location;

// Create and Save a new Location
exports.create = (req, res) => {
  const { Name, Address } = req.body;

  // Validate request
  if (!Name || !Address) {
    return res
      .status(400)
      .send({ message: "Required fields cannot be empty!" });
  }

  // Create a Location
  Location.create({
    Name,
    Address,
  })
    .then((location) => {
      res.send(location);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location.",
      });
    });
};

// Retrieve all Locations from the database
exports.findAll = (req, res) => {
  Location.findAll()
    .then((locations) => {
      res.send(locations);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations.",
      });
    });
};

// Find a single Location by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findByPk(id)
    .then((location) => {
      if (!location) {
        res.status(404).send({ message: `Location with id ${id} not found.` });
      } else {
        res.send(location);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error retrieving location with id ${id}` });
    });
};

// Update a Location by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Location.update(req.body, {
    where: { LocationID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Location was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Location with id=${id}. Location may not exist or request body is empty!`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error updating Location with id ${id}` });
    });
};

// Delete a Location by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { LocationID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Location was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Location with id=${id}. Location may not exist!`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error deleting Location with id ${id}` });
    });
};

// Delete all Locations from the database
exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Locations were deleted successfully!` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Error occurred while removing all locations.",
        });
    });
};

// Find all published Locations
exports.findAllPublished = (req, res) => {
  Location.findAll({ where: { published: true } })
    .then((locations) => {
      res.send(locations);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Some error occurred while retrieving published locations.",
        });
    });
};
