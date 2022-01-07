const pool = require("./../db/database");

//GET ALL POSITIONS
exports.getAllPositions = async (req, res, next) => {
  const allPositions = await pool.query("SELECT * FROM tbl_position");
  res.status(200).json({
    status: "success",
    data: allPositions.rows,
  });
};

//FIND POSITION BY ID
exports.getOnePosition = async (req, res, next) => {
  const position_id = req.params.id;
  const position = await pool.query(
    "SELECT * FROM tbl_position WHERE position_id = $1 ",
    [position_id]
  );

  if (position.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this position" })
    );
  }

  res.status(200).json({
    status: "success",
    data: position.rows,
  });
};

exports.createPosition = async (req, res, next) => {
  const { position_name } = req.body;

  const newPosition = await pool.query(
    "INSERT INTO tbl_position ( position_name) VALUES ($1) RETURNING *",
    [position_name]
  );

  if (newPosition.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this position" })
    );
  }

  res.json({ status: "success", data: newPosition.rows });
};

exports.updatePosition = async (req, res, next) => {
  const position_id = req.params.id;
  const { position_name } = req.body;
  const updatedPosition = await pool.query(
    "UPDATE tbl_position SET position_name = $1 WHERE position_id = $2",
    [position_name, position_id]
  );

  if (updatedPosition.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this position" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "position successfully updated",
  });
};

exports.deletePosition = async (req, res, next) => {
  const position_id = req.params.id;
  const deletedPosition = await pool.query(
    "DELETE FROM tbl_position WHERE position_id = $1",
    [position_id]
  );

  if (deletedPosition.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this position" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "position deleted",
  });
};
