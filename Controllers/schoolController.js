const pool = require("./../db/database");

//GET ALL POSITIONS
exports.getAllSchools = async (req, res, next) => {
  const allPositions = await pool.query("SELECT * FROM tbl_school");
  res.status(200).json({
    status: "success",
    data: allPositions.rows,
  });
};

//FIND POSITION BY ID
exports.getOneSchool = async (req, res, next) => {
  const school_id = req.params.id;
  const school = await pool.query(
    "SELECT * FROM tbl_school WHERE school_id = $1 ",
    [school_id]
  );

  if (school.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this school" })
    );
  }

  res.status(200).json({
    status: "success",
    data: school.rows,
  });
};

exports.createSchool = async (req, res, next) => {
  const { school_name } = req.body;

  const newPosition = await pool.query(
    "INSERT INTO tbl_school (school_name) VALUES ($1) RETURNING *",
    [school_name]
  );

  if (newPosition.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this school" })
    );
  }

  res.json({ status: "success", data: newPosition.rows });
};

exports.updateSchool = async (req, res, next) => {
  const school_id = req.params.id;
  const { school_name } = req.body;
  const updatedPosition = await pool.query(
    "UPDATE tbl_school SET school_name = $1 WHERE school_id = $2",
    [school_name, school_id]
  );

  if (updatedPosition.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this school" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "school successfully updated",
  });
};

exports.deleteSchool = async (req, res, next) => {
  const school_id = req.params.id;
  const deletedPosition = await pool.query(
    "DELETE FROM tbl_school WHERE school_id = $1",
    [school_id]
  );

  if (deletedPosition.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this school" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "school deleted",
  });
};
