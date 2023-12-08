const bcrypt = require("bcrypt");
const { Customer, Role } = require("../models/sequelize"); // Assuming your models are imported correctly

const createCustomersWithRoles = async (customersWithRoles) => {
  try {
    for (const customerData of customersWithRoles) {
      const { firstName, lastName, email, password, roles } = customerData;

      // Fetch or create role instances
      const foundRoles = await Promise.all(
        roles.map(async (roleName) => {
          const [role, created] = await Role.findOrCreate({
            where: { RoleName: roleName },
          });
          return role;
        })
      );

      // Extract RoleIDs from foundRoles
      const roleIds = foundRoles.map((role) => role.RoleID);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the customer
      const newCustomer = await Customer.create({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: hashedPassword,
      });

      // Associate roles with the customer using their IDs
      await newCustomer.addRoles(roleIds);
    }

    console.log("Customers with roles created successfully!");
  } catch (error) {
    console.error("Error creating customers with roles:", error);
  }
};

module.exports = createCustomersWithRoles;
