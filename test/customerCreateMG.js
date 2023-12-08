const bcrypt = require("bcrypt");
const Customer = require("../models/mongodb/customer.model");
const Role = require("../models/mongodb/role.model");

const createCustomersWithRolesMongo = async (customersWithRoles) => {
  try {
    for (const customerData of customersWithRoles) {
      const { firstName, lastName, email, password, roles } = customerData;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Array to store role IDs
      let roleIds = [];

      // Fetch existing roles from the database
      const foundRoles = await Role.find({ roleName: { $in: roles } });

      // Create missing roles if they don't exist and collect their IDs
      for (const roleName of roles) {
        let role = foundRoles.find((r) => r.roleName === roleName);
        if (!role) {
          // Role doesn't exist, create a new role
          const createdRole = await Role.create({ roleName });
          roleIds.push(createdRole._id); // Collect the ID of the newly created role
        } else {
          roleIds.push(role._id); // Collect the ID of the existing role
        }
      }

      // Create the customer in MongoDB with role references
      const createdCustomer = await Customer.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roles: roleIds, // Assign role IDs to the roles field in the customer document
      });

      console.log(`Customer created: ${createdCustomer}`);

      // You can perform further operations if needed
    }

    console.log("Customers with roles created successfully in MongoDB!");
  } catch (error) {
    console.error("Error creating customers with roles in MongoDB:", error);
  }
};

module.exports = createCustomersWithRolesMongo;
