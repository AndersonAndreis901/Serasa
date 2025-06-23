DELIMITER //

CREATE PROCEDURE InsertScore (
  IN cadastro INT,
  IN valorScore INT
)
BEGIN
  INSERT INTO score (cadastro_id, valor, data_calculo)
  VALUES (cadastro, valorScore, CURDATE());
END //

DELIMITER ;
