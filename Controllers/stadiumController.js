const pool = require("./../db/database");

//Get All Stadiums
exports.getAllStadiums = async (req, res, next) => {
  const allStadiums = await pool.query(
    "select * from tbl_stadium s join tbl_team t on s.team_id = t.team_id;"
  );
  res.status(200).json({
    status: "success",
    data: allStadiums.rows,
  });
};

//Create Stadium
exports.createStadium = async (req, res, next) => {
  const { stadium_capacity } = req.body;
  const { location_id } = req.body;

  const newStadium = await pool.query(
    "INSERT INTO tbl_stadium (stadium_capacity, location_id) VALUES ($1, $2) RETURNING *",
    [stadium_capacity, location_id]
  );

  if (newStadium.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this stadium" })
    );
  }

  res.json({ status: "success", data: newStadium.rows });
};

//Get Stadium By ID

exports.getOneStadium = async (req, res, next) => {
  const stadium_id = req.params.id;
  const stadium = await pool.query(
    "select * from tbl_stadium s join tbl_team t on s.team_id = t.team_id where stadium_id = $1 ",
    [stadium_id]
  );

  if (stadium.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this stadium" })
    );
  }

  res.status(200).json({
    status: "success",
    data: stadium.rows,
  });
};

//Update Stadium
exports.updateStadium = async (req, res, next) => {
  const stadium_id = req.params.id;
  const { stadium_capacity } = req.body;
  const { location_id } = req.body;
  const updatedStadium = await pool.query(
    "UPDATE tbl_stadium SET stadium_capacity = $1, location_id = $2 WHERE stadium_id = $3",
    [stadium_capacity, location_id, stadium_id]
  );

  if (updatedStadium.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this stadium" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "stadium successfully updated",
  });
};

//Delete Stadium
exports.deleteStadium = async (req, res, next) => {
  const stadium_id = req.params.id;
  const deletedStadium = await pool.query(
    "DELETE FROM tbl_stadium WHERE stadium_id = $1",
    [stadium_id]
  );

  if (deletedStadium.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this stadium" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "stadium deleted",
  });
};
