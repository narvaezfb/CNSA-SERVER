const pool = require("./../db/database");

//Get All Teams
exports.getAllTeams = async (req, res, next) => {
  const allTeams = await pool.query(
    "SELECT * FROM tbl_team t join tbl_school s on t.school_id = s.school_id"
  );
  res.status(200).json({
    status: "success",
    data: allTeams.rows,
  });
};

//Create Team
exports.createTeam = async (req, res, next) => {
  const { team_name } = req.body;
  const { school_id } = req.body;

  const newTeam = await pool.query(
    "INSERT INTO tbl_team (team_name, school_id) VALUES ($1, $2) RETURNING *",
    [team_name, school_id]
  );

  if (newTeam.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this team" })
    );
  }

  res.json({ status: "success", data: newTeam.rows });
};

//Get Team By ID

exports.getOneTeam = async (req, res, next) => {
  const team_id = req.params.id;
  const team = await pool.query("SELECT * FROM tbl_team WHERE team_id = $1 ", [
    team_id,
  ]);

  if (team.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this team" })
    );
  }

  res.status(200).json({
    status: "success",
    data: team.rows,
  });
};

//Update Team
exports.updateTeam = async (req, res, next) => {
  const team_id = req.params.id;
  const { team_name } = req.body;
  const { school_id } = req.body;
  const updatedTeam = await pool.query(
    "UPDATE tbl_team SET team_name = $1, school_id = $2 WHERE team_id = $3",
    [team_name, school_id, team_id]
  );

  if (updatedTeam.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this team" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "team successfully updated",
  });
};

//Delete Team
exports.deleteTeam = async (req, res, next) => {
  const team_id = req.params.id;
  const deletedTeam = await pool.query(
    "DELETE FROM tbl_team WHERE position_id = $1",
    [team_id]
  );

  if (deletedTeam.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this team" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "team deleted",
  });
};
