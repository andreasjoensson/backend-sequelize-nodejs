/*

CREATE TABLE audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50),
    description TEXT,
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TRIGGER `AfterRentalInsert`
AFTER INSERT ON `rentals` FOR EACH ROW
BEGIN
    INSERT INTO audit_log (action, description)
    VALUES ('INSERT', CONCAT('New rental added with ID ', NEW.RentalID));
END;

*/