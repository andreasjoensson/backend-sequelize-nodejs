const bcrypt = require("bcrypt");
const { Customer, Role } = require("../models/sequelize"); // Assuming your models are imported correctly

const createCustomersWithRoles = async () => {
  try {
    // Define test customers with respective roles
    const customersWithRoles = [
      {
        firstName: "App",
        lastName: "User",
        email: "appuser@example.com",
        password: "password123", // Plain password (it will be hashed in the function)
        roles: ["ApplicationUser"],
      },
      {
        firstName: "DB",
        lastName: "Admin",
        email: "dbadmin@example.com",
        password: "password123",
        roles: ["DatabaseAdmin"],
      },
      {
        firstName: "Read",
        lastName: "Only",
        email: "readonly@example.com",
        password: "password123",
        roles: ["ReadOnlyUser"],
      },
      {
        firstName: "Restricted",
        lastName: "User",
        email: "restricted@example.com",
        password: "password123",
        roles: ["RestrictedUser"],
      },
    ];

    for (const customerData of customersWithRoles) {
      const { firstName, lastName, email, password, roles } = customerData;

      // Fetch role instances from the database
      const foundRoles = await Role.findAll({
        where: { RoleName: roles },
      });

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
