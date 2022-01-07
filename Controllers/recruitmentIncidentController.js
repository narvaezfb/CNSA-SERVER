const pool = require("./../db/database");

//FIND ALL RECRUITMENT INCIDENT
exports.getAllRecIncident = async (req, res, next) => {
  const allRecIncident = await pool.query(
    "SELECT * FROM tbl_recruitment_incident"
  );
  res.status(200).json({
    status: "success",
    data: allRecIncident.rows,
  });
};

//FIND RECRUITMENT INCIDENT BY ID
exports.getOneRecIncident = async (req, res, next) => {
  const incident_id = req.params.id;
  const incident = await pool.query(
    "SELECT * FROM tbl_recruitment_incident WHERE incident_id = $1 ",
    [incident_id]
  );

  if (incident.rowCount === 0) {
    return next(
      res.json({
        status: "failed",
        message: "could find this recruitment incident",
      })
    );
  }

  res.status(200).json({
    status: "success",
    data: incident.rows,
  });
};

//CREATE A NEW RECRUITMENT INCIDENT
exports.createRecIncident = async (req, res, next) => {
  const {
    incident_date,
    incident_comments,
    recruitment_rule_id,
    team_id,
    player_id,
  } = req.body;

  const newIncident = await pool.query(
    "INSERT INTO tbl_recruitment_incident ( incident_date, incident_comments, recruitment_rule_id, team_id, player_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [incident_date, incident_comments, recruitment_rule_id, team_id, player_id]
  );

  if (newIncident.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this incident" })
    );
  }

  res.json({ status: "success", data: newIncident.rows });
};

//UPDATE A RECRUITMENT INCIDENT
exports.updateRecIncident = async (req, res, next) => {
  const incident_id = req.params.id;
  const {
    incident_date,
    incident_comments,
    recruitment_rule_id,
    team_id,
    player_id,
  } = req.body;

  const updatedIncident = await pool.query(
    "UPDATE  tbl_recruitment_incident SET  incident_date = $1, incident_comments = $2, recruitment_rule_id = $3, team_id = $4, player_id = $5 WHERE incident_id = $8",
    [
      incident_date,
      incident_comments,
      recruitment_rule_id,
      team_id,
      player_id,
      incident_id,
    ]
  );

  if (updatedIncident.rowCount === 0) {
    return next(
      res.json({
        status: "failed",
        message: "could not find this recruitment incident",
      })
    );
  }

  res.status(200).json({
    status: "success",
    message: "recruitment incident successfully updated",
  });
};

//DELETE A RECRUITMENT INCIDENT
exports.deleteRecIncident = async (req, res, next) => {
  const incident_id = req.params.id;
  const deletedRecIncident = await pool.query(
    "DELETE FROM tbl_recruitment_incident WHERE incident_id = $1",
    [incident_id]
  );

  if (deletedRecIncident.rowCount === 0) {
    return next(
      res.json({
        status: "failed",
        message: "could not find this recruitment incident",
      })
    );
  }

  res.status(200).json({
    status: "success",
    message: "Recruitment Incident deleted",
  });
};
