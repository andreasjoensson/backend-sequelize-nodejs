const Customer = require("../../models/mongodb/customer.model");


const getCustomersWithCarsAndRentalsMongo = async () => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "rentals",
          localField: "CustomerID",
          foreignField: "CustomerID",
          as: "rentals",
        },
      },
      {
        $unwind: {
          path: "$rentals",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "rentals.CarID",
          foreignField: "CarID",
          as: "cars",
        },
      },
      {
        $unwind: {
          path: "$cars",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          CustomerID: "$CustomerID",
          FirstName: "$firstName",  // Changed to match schema
          LastName: "$lastName",    // Changed to match schema
          Email: "$email",          // Changed to match schema
          Phone: "$phone",          // Changed to match schema
          Address: "$address",      // Changed to match schema
          Password: "$password",    // Changed to match schema
          RentalID: "$rentals._id",
          RentalDate: "$rentals.RentalDate",
          ReturnDate: "$rentals.ReturnDate",
          CarID: "$cars._id",
          Make: "$cars.Make",
          Model: "$cars.Model",
          Year: "$cars.Year",
          RentalRate: "$cars.RentalRate",
        }
      },      
      {
        $sort: {
          CustomerID: 1,
          RentalID: 1,
          CarID: 1,
        },
      },
    ]);

    console.log('customers', customers);

    return customers[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};

module.exports = getCustomersWithCarsAndRentalsMongo;
