const bcrypt = require("bcrypt");
const { Customer, Role } = require("../models"); // Assuming your models are imported correctly

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

    // Loop through customers and create them with associated roles
    for (const customerData of customersWithRoles) {
      const { firstName, lastName, email, password, roles } = customerData;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the customer
      const newCustomer = await Customer.create({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: hashedPassword,
      });

      // Find roles associated with the customer and add them
      const foundRoles = await Role.findAll({
        where: { RoleName: roles },
      });

      await newCustomer.addRoles(foundRoles);
    }

    console.log("Customers with roles created successfully!");
  } catch (error) {
    console.error("Error creating customers with roles:", error);
  }
};

// Call the function to create customers with roles
createCustomersWithRoles();
