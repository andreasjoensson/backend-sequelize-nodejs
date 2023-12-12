/*
CREATE VIEW `View_CustomerRentals` AS
SELECT 
    customers.CustomerID, 
    customers.FirstName, 
    customers.LastName, 
    rentals.RentalDate, 
    rentals.ReturnDate
FROM 
    customers
JOIN 
    rentals ON customers.CustomerID = rentals.CustomerID;
*/