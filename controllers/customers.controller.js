const db = require("../models"); // Import your Sequelize models

const Customer = db.Customer;

// Create and Save a new Customer
exports.create = (req, res) => {
  const { FirstName, LastName, Email, Phone, Address } = req.body;

  // Validate request
  if (!FirstName || !LastName || !Email) {
    return res
      .status(400)
      .send({ message: "Required fields cannot be empty!" });
  }

  // Create a Customer
  Customer.create({
    FirstName,
    LastName,
    Email,
    Phone,
    Address,
  })
    .then((customer) => {
      res.send(customer);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all Customers from the database
exports.findAll = (req, res) => {
  Customer.findAll()
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single Customer by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then((customer) => {
      if (!customer) {
        res.status(404).send({ message: `Customer with id ${id} not found.` });
      } else {
        res.send(customer);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error retrieving customer with id ${id}` });
    });
};

// Update a Customer by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { CustomerID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Customer was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Customer may not exist or request body is empty!`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error updating Customer with id ${id}` });
    });
};

// Delete a Customer by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { CustomerID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Customer was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Customer may not exist!`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error deleting Customer with id ${id}` });
    });
};

// Delete all Customers from the database
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Customers were deleted successfully!` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Error occurred while removing all customers.",
        });
    });
};

// Find all Customers by a specific condition (example: where published = true)
exports.findAllPublished = (req, res) => {
  Customer.findAll({ where: { published: true } })
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Some error occurred while retrieving published customers.",
        });
    });
};
