const bcrypt = require("bcrypt");
const { Customer, Role } = require("../models/sequelize"); // Assuming your Sequelize models are imported correctly

const createCustomerSQ = async (customerData) => {
  const { FirstName, LastName, Email, Phone, Address } = customerData;

  // Validate data (if necessary)
  if (!FirstName || !LastName || !Email) {
    throw new Error("Required fields cannot be empty!");
  }

  try {
    // Create a Customer
    const hashedPassword = await bcrypt.hash("defaultPassword", 10); // Assuming default password
    const customer = await Customer.create({
      FirstName,
      LastName,
      Email,
      Phone,
      Address,
      Password: hashedPassword,
    });

    return customer;
  } catch (error) {
    throw new Error("Error creating customer in Sequelize: " + error.message);
  }
};

const findAllCustomersSQ = async () => {
  try {
    // Retrieve all Customers from the database
    const customers = await Customer.findAll();
    return customers;
  } catch (error) {
    throw new Error(
      "Error retrieving customers in Sequelize: " + error.message
    );
  }
};

const findCustomerByIdSQ = async (id) => {
  try {
    // Find a single Customer by ID
    const customer = await Customer.findByPk(id);

    if (!customer) {
      throw new Error(`Customer with id ${id} not found.`);
    }

    return customer;
  } catch (error) {
    throw new Error(
      "Error retrieving customer by ID in Sequelize: " + error.message
    );
  }
};

const updateCustomerSQ = async (id, updatedData) => {
  try {
    // Update a Customer by ID
    const [updatedRowsCount, updatedCustomer] = await Customer.update(
      updatedData,
      {
        where: { CustomerID: id },
        returning: true,
      }
    );

    if (updatedRowsCount !== 1) {
      throw new Error(
        `Cannot update Customer with id=${id}. Customer may not exist or request body is empty!`
      );
    }

    return updatedCustomer[0];
  } catch (error) {
    throw new Error("Error updating Customer in Sequelize: " + error.message);
  }
};

const deleteCustomerSQ = async (id) => {
  try {
    // Delete a Customer by ID
    const deletedRowCount = await Customer.destroy({
      where: { CustomerID: id },
    });

    if (deletedRowCount !== 1) {
      throw new Error(
        `Cannot delete Customer with id=${id}. Customer may not exist!`
      );
    }

    return { message: "Customer was deleted successfully!" };
  } catch (error) {
    throw new Error("Error deleting Customer in Sequelize: " + error.message);
  }
};

const deleteAllCustomersSQ = async () => {
  try {
    // Delete all Customers from the database
    const deletedRowCount = await Customer.destroy({
      where: {},
      truncate: false,
    });

    return {
      message: `${deletedRowCount} Customers were deleted successfully!`,
    };
  } catch (error) {
    throw new Error(
      "Error deleting all Customers in Sequelize: " + error.message
    );
  }
};

module.exports = {
  createCustomerSQ,
  findAllCustomersSQ,
  findCustomerByIdSQ,
  updateCustomerSQ,
  deleteCustomerSQ,
  deleteAllCustomersSQ,
};
