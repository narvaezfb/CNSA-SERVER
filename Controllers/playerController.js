const pool = require("./../db/database");

//FIND ALL PLAYERS
exports.getAllPlayers = async (req, res, next) => {
  const allPlayers = await pool.query(
    "select * from tbl_player py join tbl_position ps on py.position_id = ps.position_id join tbl_team tm on py.team_id = tm.team_id"
  );
  res.status(200).json({
    status: "success",
    data: allPlayers.rows,
  });
};

//FIND PLAYER BY ID
exports.getOnePlayer = async (req, res, next) => {
  const player_id = req.params.id;
  const player = await pool.query(
    "SELECT * FROM tbl_player WHERE player_id = $1 ",
    [player_id]
  );

  if (player.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this player" })
    );
  }

  res.status(200).json({
    status: "success",
    data: player.rows,
  });
};

//CREATE A NEW PLAYER
exports.createPlayer = async (req, res, next) => {
  const {
    player_email_address,
    player_first_name,
    player_last_name,
    player_date_of_birth,
    position_id,
    team_id,
    ranking,
  } = req.body;

  const newPlayer = await pool.query(
    "INSERT INTO tbl_player ( player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      player_email_address,
      player_first_name,
      player_last_name,
      player_date_of_birth,
      position_id,
      team_id,
      ranking,
    ]
  );

  if (newPlayer.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this player" })
    );
  }

  res.json({ status: "success", data: newPlayer.rows });
};

//UPDATE A PLAYER
exports.updatePlayer = async (req, res, next) => {
  const player_id = req.params.id;
  const {
    player_email_address,
    player_first_name,
    player_last_name,
    player_date_of_birth,
    position_id,
    team_id,
    ranking,
  } = req.body;

  const updatedPlayer = await pool.query(
    "UPDATE  tbl_player SET  player_email_address = $1, player_first_name = $2, player_last_name = $3, player_date_of_birth = $4, position_id = $5, team_id = $6, ranking =$7   WHERE player_id = $8",
    [
      player_email_address,
      player_first_name,
      player_last_name,
      player_date_of_birth,
      position_id,
      team_id,
      ranking,
      player_id,
    ]
  );

  if (updatedPlayer.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this player" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "player successfully updated",
  });
};

//DELETE A PLAYER
exports.deletePlayer = async (req, res, next) => {
  const player_id = req.params.id;
  const deletedPlayer = await pool.query(
    "DELETE FROM tbl_player WHERE player_id = $1",
    [player_id]
  );

  if (deletedPlayer.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this player" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "player deleted",
  });
};
